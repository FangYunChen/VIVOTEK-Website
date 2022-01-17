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
  fromEvent as observableFromEvent,
  merge as observableMerge,
  Observable,
  Subscription
} from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { Coverage } from '../../../vvtk-core/classes/coverage';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

declare var moment: any;

@Component({
  selector: 'vvtk-coverage-list',
  templateUrl: './coverage-list.component.html',
  styleUrls: ['./coverage-list.component.scss']
})
export class CoverageListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  filter$: Subscription;

  displayedColumns = [
    'id',
    'title',
    'publishAt',
    'updatedUser',
    'updatedAt',
    'action'
  ];
  database: PageDatabase;
  dataSource: PageDataSource | null;

  lockDelete = false;

  @ViewChild('filter')
  filter: ElementRef;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/coverage/content/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/coverage/content/0'
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
      .pipe(
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  delete(id: number, title: string) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'delete coverage?',
        message: `確定刪除新聞：${title}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.database.dataChange.next([]);
        this.database.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/coverage/${id}`,
            disableLanguage: true
          },
          {
            next: resp => {
              const body = resp.json();
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
        path: `api/coverage/${id}`
      },
      {
        isOnlyModifyStatus: true,
        status: $event.checked ? 1 : 0
      },
      {}
    );
  }

  ngOnDestroy() {
    this.filter$.unsubscribe();
    this.database.onDestroy();
    this.dataSource.onDestroy();
  }
}

export class PageDatabase {
  selectedLanguage$: Subscription;

  dataChange: BehaviorSubject<Coverage[]> = new BehaviorSubject<Coverage[]>([]);
  get data(): Coverage[] {
    return this.dataChange.value;
  }

  dataLength: number;

  years: number[];
  selectedYear: number;

  canGetData = false;

  isLoading = true;

  query = {
    scope: 'all',
    year: '',
    filter: '',
    sort: 'desc',
    order: 'publishAt',
    pageIndex: 0,
    start: 0,
    limit: 10,
    zone: moment.parseZone(new Date()).utcOffset()
  };

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private _paginator: MatPaginator
  ) {
    this.getCoverageYears();
  }

  getCoverageYears() {
    this.vvtkService.get(
      {
        path: `api/Coverage/Years`,
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
    this.query.start = this.query.pageIndex * this.query.limit;
    this.vvtkService.get(
      {
        path: `api/Coverage/List`,
        query: this.query
      },
      {
        next: resp => {
          const body = resp.json();
          this.dataLength = body.filterTotal;
          this.dataChange.next(body.list);
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  selectYear() {
    this.setQuery({
      year: this.selectedYear,
      pageIndex: 0
    });
  }

  setQuery(obj: object) {
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        this.query[p] = obj[p];
      }
    }
    if (this._paginator.pageIndex !== this.query.pageIndex) {
      this._paginator.page.next({
        pageIndex: this.query.pageIndex,
        pageSize: this.query.limit,
        length: this.dataLength
      });
    } else {
      this.getData();
    }
  }

  onDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}

export class PageDataSource extends DataSource<any> {
  filterChange$: Subscription;
  sortChange$: Subscription;
  pageChange$: Subscription;

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

  oldPaginator: {
    pageIndex: number;
    pageSize: number;
    length: number;
  };

  constructor(
    private _database: PageDatabase,
    private _sort: MatSort,
    private _paginator: MatPaginator
  ) {
    super();
    this.filterChange$ = this._filterChange.subscribe(val => {
      this.filterData(val);
    });
    this.sortChange$ = this._sort.sortChange.subscribe(val => {
      this.sortedData(val);
    });
    this.pageChange$ = this._paginator.page.subscribe(val => {
      this.paginator(val);
    });
    this.oldPaginator = {
      pageIndex: 0,
      pageSize: 10,
      length: 0
    };
  }

  connect(): Observable<Coverage[]> {
    const displayDataChanges = [this._database.dataChange];

    return observableMerge(...displayDataChanges).pipe(
      map(() => {
        const data = this._database.data.slice();
        return data;
      })
    );
  }

  disconnect() { }

  filterData(val) {
    if (!this._database) {
      return;
    }
    this._database.setQuery({
      filter: val,
      pageIndex: 0
    });
  }

  sortedData(val) {
    if (!this._database) {
      return;
    }
    if (val.direction === '') {
      this._database.setQuery({
        sort: '',
        order: '',
        pageIndex: 0
      });
    } else {
      this._database.setQuery({
        sort: val.direction,
        order: val.active,
        pageIndex: 0
      });
    }
  }

  paginator(val) {
    if (!this._database) {
      return;
    }
    if (val.pageSize !== this.oldPaginator.pageSize) {
      this._database.setQuery({
        limit: val.pageSize,
        pageIndex: 0
      });
    }
    if (val.pageIndex !== this.oldPaginator.pageIndex) {
      this._paginator.pageIndex = val.pageIndex;
      this._database.setQuery({
        pageIndex: val.pageIndex
      });
    }
    this.oldPaginator = val;
  }

  onDestroy() {
    this.filterChange$.unsubscribe();
    this.sortChange$.unsubscribe();
    this.pageChange$.unsubscribe();
  }
}
