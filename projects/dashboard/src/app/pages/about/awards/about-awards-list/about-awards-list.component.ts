import { DataSource } from '@angular/cdk/table';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  fromEvent,
  merge as observableMerge
} from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';
import { AboutAward } from '../../../../vvtk-core/classes/aboutAward';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
export class PageDatabase {
  selectedLanguage$: Subscription;

  dataChange: BehaviorSubject<AboutAward[]> = new BehaviorSubject<AboutAward[]>(
    []
  );
  get data(): AboutAward[] {
    return this.dataChange.value;
  }

  isLoading = true;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getData();
      }
    );
  }

  getData() {
    this.isLoading = true;

    this.vvtkService.get(
      { path: `api/Awards/List` },
      {
        next: resp => {
          const body = resp.json();
          this.dataChange.next(body.list);
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  onDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}

export class PageDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  _selectedYear = new BehaviorSubject(0);
  get selectedYear(): number {
    return this._selectedYear.value;
  }
  set selectedYear(selectedYear: number) {
    this._selectedYear.next(selectedYear);
  }

  _dataLength: number;
  get dataLength(): number {
    return this._dataLength || 0;
  }

  constructor(
    private _database: PageDatabase,
    private _sort: MatSort,
    private _paginator: MatPaginator
  ) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AboutAward[]> {
    const displayDataChanges = [
      this._database.dataChange,
      this._filterChange,
      this._selectedYear,
      this._sort.sortChange,
      this._paginator.page
    ];

    return observableMerge(...displayDataChanges).pipe(
      map(() => {
        let data = this._database.data.slice();
        data = this.getFilterData(data);
        data = this.getSortedData(data);
        this._dataLength = data.length;
        data = this.getPaginator(data);
        return data;
      })
    );
  }

  disconnect() { }

  getFilterData(data: AboutAward[]): AboutAward[] {
    return data.filter((item: AboutAward) => {
      const searchStr = (
        item.id +
        item.year.toString() +
        item.month.toString() +
        item.title
      ).toLowerCase();
      return (
        item.year === this.selectedYear &&
        searchStr.indexOf(this.filter.toLowerCase()) !== -1
      );
    });
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(data: AboutAward[]): AboutAward[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'title':
          [propertyA, propertyB] = [a.title, b.title];
          break;
        case 'year':
          [propertyA, propertyB] = [a.year, b.year];
          break;
        case 'month':
          [propertyA, propertyB] = [a.month, b.month];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  getPaginator(data: AboutAward[]): AboutAward[] {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }
}

@Component({
  selector: 'vvtk-about-awards-list',
  templateUrl: './about-awards-list.component.html',
  styleUrls: ['./about-awards-list.component.scss']
})
export class AboutAwardsListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  filter$: Subscription;

  displayedColumns = ['id', 'year', 'month', 'title', 'action'];
  database: PageDatabase;
  dataSource: PageDataSource | null;

  years: number[] = [];

  lockDelete = false;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/about/award/content/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/about/award/content/0'
    );
    this.database = new PageDatabase(this.vvtkService, this.sharedService);
    this.dataSource = new PageDataSource(
      this.database,
      this.sort,
      this.paginator
    );
    this.filter$ = fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
    this.getYears();
  }

  getYears() {
    this.vvtkService.get(
      {
        path: `api/Awards/Years`,
        disableLanguage: false
      },
      {
        next: resp => {
          const body = resp.json();
          this.years = body || [];
          this.years.reverse();
          this.dataSource.selectedYear = this.years[0] || 0;
        }
      }
    );
  }

  delete(id: number, name: string) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'delete?',
        message: `確定刪除：${name}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.database.dataChange.next([]);
        this.database.isLoading = true;

        this.vvtkService.delete(
          {
            path: `api/Award/${id}`,
            disableLanguage: true
          },
          {
            next: resp => {
              this.database.getData();
            }
          }
        );
      }
      this.lockDelete = false;
    });
  }

  ngOnDestroy() {
    this.filter$.unsubscribe();
    this.database.onDestroy();
  }
}
