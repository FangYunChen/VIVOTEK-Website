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
  fromEvent as observableFromEvent,
  merge as observableMerge
} from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { Event } from '../../../vvtk-core/classes/event';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

declare var moment: any;

export class PageDatabase {
  selectedLanguage$: Subscription;

  dataChange: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  get data(): Event[] {
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
      {
        path: `api/Events/List`,
        query: {
          scope: 'all'
        }
      },
      {
        next: resp => {
          const body = resp.json();
          body.list.forEach((item: Event) => {
            item.startAt = moment(item.startAt).format('YYYY/MM/DD');
          });
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

  _yearChange = new BehaviorSubject(0);
  get year(): number {
    return this._yearChange.value;
  }
  set year(year: number) {
    this._yearChange.next(year);
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
  connect(): Observable<Event[]> {
    const displayDataChanges = [
      this._database.dataChange,
      this._yearChange,
      this._filterChange,
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

  disconnect() {}

  getFilterData(data: Event[]): Event[] {
    return data.filter((item: Event) => {
      const searchStr = (item.title + item.startAt).toLowerCase();
      return (
        searchStr.indexOf(this.filter.toLowerCase()) !== -1 &&
        moment(item.startAt, 'YYYY/MM/DD').year() === this.year
      );
    });
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(data: Event[]): Event[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'title':
          [propertyA, propertyB] = [a.title, b.title];
          break;
        case 'startAt':
          [propertyA, propertyB] = [a.startAt, b.startAt];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  getPaginator(data: Event[]): Event[] {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }
}

@Component({
  selector: 'vvtk-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  filter$: Subscription;

  displayedColumns = ['id', 'title', 'startAt', 'action'];
  database = new PageDatabase(this.vvtkService, this.sharedService);
  dataSource: PageDataSource | null;

  years: number[] = [];
  selectedYear: number;

  lockDelete = false;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/event/content/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/event/content/0'
    );

    this.dataSource = new PageDataSource(
      this.database,
      this.sort,
      this.paginator
    );
    this.filter$ = observableFromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
    this.getEventsYears();
  }

  getEventsYears() {
    this.vvtkService.get(
      {
        path: `api/Events/Years`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          if (body.length > 0) {
            this.years = body || [];
            this.years.reverse();
            this.selectedYear = this.years[0] || 0;
            this.selectYear();
          }
        }
      }
    );
  }

  selectYear() {
    this.dataSource.year = this.selectedYear;
  }

  delete(id: number, title: string) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'delete?',
        message: `確定刪除：${title}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.database.dataChange.next([]);
        this.database.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/Event/${id}`,
            disableLanguage: true
          },
          {
            next: resp => {
              this.database.getData();
            },
            finally: () => {
              this.database.isLoading = false;
            }
          }
        );
      } else {
      }
      this.lockDelete = false;
    });
  }

  changeStatus($event, id: number) {
    this.vvtkService.patch(
      {
        path: `api/Event/${id}`
      },
      {
        status: $event.checked ? 1 : 0
      },
      {}
    );
  }

  changeStickTop($event, id: number) {
    this.vvtkService.patch(
      {
        path: `api/Event/${id}`
      },
      {
        stickTop: $event.checked
      },
      {}
    );
  }

  ngOnDestroy() {
    this.filter$.unsubscribe();
    this.database.onDestroy();
  }
}
