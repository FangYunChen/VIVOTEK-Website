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
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { SIAPartner } from '../../../../../vvtk-core/classes/siaPartner';
import { environment } from 'projects/dashboard/src/environments/environment';

@Component({
  selector: 'vvtk-sia-partner-list',
  templateUrl: './sia-partner-list.component.html'
})
export class SIAPartnerListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  filter$: Subscription;

  displayedColumns = [
    'id',
    'brandName',
    'companyName',
    'partnerCategoriesText',
    'partnerTypesText',
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
      '/partners/sia-program/sia-partner/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/partners/sia-program/sia-partner/0'
    );

    this.database = new PageDatabase(
      this.vvtkService,
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

  exportPartner() {
    document.location.href = `${environment.apiUrl}/api/SIAPartner/Export`;
  }

  delete(id: number, companyName: string) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete partner?',
        message: `Delete this partner：${companyName}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.database.dataChange.next([]);
        this.database.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/SIAPartner/${id}`,
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
    this.dataSource.onDestroy();
  }
}

export class PageDatabase {

  dataChange: BehaviorSubject<SIAPartner[]> = new BehaviorSubject<SIAPartner[]>([]);
  get data(): SIAPartner[] {
    return this.dataChange.value;
  }

  dataLength: number;

  countries: string[];
  selectedCountry = 'All';

  isLoading = true;

  query = {
    filter: '',
    sort: 'asc',
    order: 'brandname',
    pageIndex: 0,
    start: 0,
    limit: 10,
  };

  constructor(
    private vvtkService: VvtkService,
    private _paginator: MatPaginator
  ) {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.query.start = this.query.pageIndex * this.query.limit;
    this.vvtkService.get(
      {
        path: `api/SIAPartner/ManageList`,
        disableLanguage: true,
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

  connect(): Observable<SIAPartner[]> {
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
