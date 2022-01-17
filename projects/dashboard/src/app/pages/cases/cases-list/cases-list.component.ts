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
import { Case } from '../../../vvtk-core/classes/case';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

declare var moment: any;

export class PageDatabase {
  selectedLanguage$: Subscription;

  dataChange: BehaviorSubject<Case[]> = new BehaviorSubject<Case[]>([]);
  get data(): Case[] {
    return this.dataChange.value;
  }

  dataLength: number;

  years: number[];
  selectedYear: number;

  filterText: {
    all: string[];
    category: string[];
    country: string[];
    model: string[];
  } = {
    all: [],
    category: [],
    country: [],
    model: []
  };

  canGetData = false;

  isLoading = true;

  query = {
    scope: 'all',
    year: ''
  };

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private _paginator: MatPaginator
  ) {
    this.getCasesYears();
  }

  getCasesYears() {
    this.vvtkService.get(
      {
        path: `api/Cases/Years`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();

          this.years = body || [];
          this.years.reverse();
          this.selectedYear = this.years[0] || 0;
          this.query.year = this.selectedYear.toString();
          this.getSelectedLanguage();
        }
      }
    );
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.canGetData = true;
        this.getData();
      }
    );
  }

  getData() {
    if (!this.canGetData) {
      return;
    }
    this.isLoading = true;

    this.vvtkService.get(
      {
        path: `api/Cases/List`,
        query: this.query
      },
      {
        next: resp => {
          const body = resp.json();
          this.dataChange.next(body.list);
          this.setFilterText(body.list);
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  selectYear() {
    this.setQuery({
      year: this.selectedYear
    });
  }

  setQuery(obj: object) {
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        this.query[p] = obj[p];
      }
    }
    this.getData();
  }

  setFilterText(data: Case[]) {
    this.filterText = {
      all: [],
      category: [],
      country: [],
      model: []
    };
    data.forEach(item => {
      if (this.filterText.category.indexOf(item.vertical) < 0) {
        this.filterText.category.push(item.vertical);
      }
      if (this.filterText.all.indexOf(item.vertical) < 0) {
        this.filterText.all.push(item.vertical);
      }
      if (this.filterText.country.indexOf(item.country.name) < 0) {
        this.filterText.country.push(item.country.name);
      }
      if (this.filterText.all.indexOf(item.country.name) < 0) {
        this.filterText.all.push(item.country.name);
      }
      item.solutions.forEach(solution => {
        if (this.filterText.model.indexOf(solution.title) < 0) {
          this.filterText.model.push(solution.title);
        }
        if (this.filterText.all.indexOf(solution.title) < 0) {
          this.filterText.all.push(solution.title);
        }
      });
    });
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

  _dataLength: number;
  get dataLength(): number {
    return this._dataLength || 0;
  }

  filterType = 'all';
  options: string[] = [];

  constructor(
    private _database: PageDatabase,
    private _sort: MatSort,
    private _paginator: MatPaginator
  ) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Case[]> {
    const displayDataChanges = [
      this._database.dataChange,
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

  getFilterData(data: Case[]): Case[] {
    const filterText = this.filter.toLowerCase();
    let filterTextList: string[];
    switch (this.filterType) {
      case 'category':
        filterTextList = this._database.filterText.category;
        break;
      case 'country':
        filterTextList = this._database.filterText.country;
        break;
      case 'model':
        filterTextList = this._database.filterText.model;
        break;
      default:
        filterTextList = this._database.filterText.all;
        break;
    }
    this.options = filterTextList.filter(item => {
      return item.toLowerCase().indexOf(filterText) >= 0;
    });

    return data.filter((item: Case) => {
      let solutionsStr = '';
      item.solutions.forEach(solution => {
        solutionsStr += solution.title;
      });
      switch (this.filterType) {
        case 'category':
          return item.vertical.toLowerCase().indexOf(filterText) !== -1;
        case 'country':
          return item.country.name.toLowerCase().indexOf(filterText) !== -1;
        case 'model':
          return solutionsStr.toLowerCase().indexOf(filterText) !== -1;
        default:
          return (
            item.vertical.toLowerCase().indexOf(filterText) !== -1 ||
            item.country.name.toLowerCase().indexOf(filterText) !== -1 ||
            solutionsStr.toLowerCase().indexOf(filterText) !== -1
          );
      }
    });
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(data: Case[]): Case[] {
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
        case 'publishAt':
          [propertyA, propertyB] = [a.publishAt, b.publishAt];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  getPaginator(data: Case[]): Case[] {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }
}

@Component({
  selector: 'vvtk-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  filter$: Subscription;

  displayedColumns = ['id', 'title', 'publishAt', 'action'];
  database: PageDatabase;
  dataSource: PageDataSource | null;

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
      '/case/content/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/case/content/0'
    );

    this.database = new PageDatabase(
      this.vvtkService,
      this.sharedService,
      this.paginator
    );

    this.dataSource = new PageDataSource(
      this.database,
      this.sort,
      this.paginator
    );
    this.filter$ = observableFromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe(() => {
        this.doFilter();
      });
  }

  changeFilterType() {
    this.filter.nativeElement.value = '';
    this.doFilter();
  }

  doFilter() {
    if (!this.dataSource) {
      return;
    }
    setTimeout(() => {
      this.dataSource.filter = this.filter.nativeElement.value;
    }, 1);
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
            path: `api/Case/${id}`,
            disableLanguage: true
          },
          {
            next: resp => {
              this.database.getData();
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
        path: `api/Case/${id}`
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
        path: `api/Case/${id}`
      },
      {
        stickTop: $event.checked
      },
      {}
    );
  }

  changeIsHideTw($event, id: number) {
    this.vvtkService.patch(
      {
        path: `api/Case/${id}`
      },
      {
        isHideTw: $event.checked
      },
      {}
    );
  }

  ngOnDestroy() {
    this.filter$.unsubscribe();
    this.database.onDestroy();
    // this.dataSource.onDestroy();
  }
}
