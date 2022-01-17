import {
  Component,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import {
  BehaviorSubject,
  fromEvent as observableFromEvent,
  merge as observableMerge,
  Observable,
  Subscription
} from 'rxjs';
import { debounceTime, distinctUntilChanged, map, finalize } from 'rxjs/operators';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import {
  FeatureArticleListItem,
  Banner,
  Banners
} from '../../../../../vvtk-core/classes/featureArticle';
import { DataSource } from '@angular/cdk/table';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-feature-article-list',
  templateUrl: './feature-article-list.component.html',
  styleUrls: ['./feature-article-list.component.scss']
})
export class FeatureArticleListComponent implements OnInit {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;
  path = 'Supports/Learning/FeatureArticleList';

  filter$: Subscription;

  displayedColumns = ['id', 'linkText', 'updatedUser', 'updatedAt', 'action'];

  selectedLanguage$: Subscription;
  isLoading = true;
  lockDelete = false;
  data: FeatureArticleListItem[];
  apiPathPrefix = `api/Supports/Learning/FeatureArticleList`;
  groupOptions: SortablejsOptions = {
    group: 'group1',
    handle: '.drag-handle',
    animation: 300,
    onUpdate: (event: any) => {
      this.patchSequence();
    }
  };
  database: PageDatabase;
  dataSource: PageDataSource | null;

  banner: Banners = {
    PC: {
      type: 'PC',
      imageName: '',
      imageAlt: '',
      imageUrl: '',
      hideContent: true
    },
    Tablet: {
      type: 'Tablet',
      imageName: '',
      imageAlt: '',
      imageUrl: '',
      hideContent: true
    },
    Mobile: {
      type: 'Mobile',
      imageName: '',
      imageAlt: '',
      imageUrl: '',
      hideContent: true
    }
  };

  readOnly = false;

  @ViewChild('filter')
  filter: ElementRef;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/supports/learning/feature-article/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/learning/feature-article/0'
    );
    // this.getSelectedLanguage();
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
    this.getBanner();
  }

  getBanner() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `${this.apiPathPrefix}/Banner`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          body.forEach(item => {
            item.hideContent = true;
            if (item.type === 'PC') {
              this.banner.PC = item;
            } else if (item.type === 'Tablet') {
              this.banner.Tablet = item;
            } else if (item.type === 'Mobile') {
              this.banner.Mobile = item;
            }
          });
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
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
            path: `${this.apiPathPrefix}/${id}`,
            disableLanguage: true
          },
          {
            next: resp => {
              this.database.getData();
            },
            finally: () => {
              this.isLoading = false;
            }
          }
        );
      } else {
      }
      this.lockDelete = false;
    });
  }

  patchSequence() {
    this.isLoading = true;
    const sequenceData: FeatureArticleListItem[] = [];
    let sequence = 1;
    for (let i = 0; i < this.data.length; i++) {
      sequenceData.push({
        id: this.data[i].id,
        displayOrder: sequence
      });
      sequence++;
    }

    this.vvtkService.patch(
      {
        path: `${this.apiPathPrefix}/DisplayOrder`,
        disableLanguage: true
      },
      sequenceData,
      {
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  changeIsEnabled($event, id: number) {
    this.vvtkService.patch(
      {
        path: `${this.apiPathPrefix}/${id}`,
        disableLanguage: true
      },
      {
        isEnabled: $event.checked
      },
      {}
    );
  }

  uploadFile($event, imageDevice: string) {
    let currentImage: Banner;
    if (imageDevice === 'PC') {
      currentImage = this.banner.PC;
    } else if (imageDevice === 'Tablet') {
      currentImage = this.banner.Tablet;
    } else if (imageDevice === 'Mobile') {
      currentImage = this.banner.Mobile;
    }
    this.isLoading = true;
    const file: File = $event.target.files[0];
    currentImage.imageName = file.name;
    currentImage.imageAlt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => currentImage.imageUrl = x.link
      );
  }

  saveBanner(type: string) {
    this.isLoading = true;
    let saveImage: Banner;
    if (type === 'PC') {
      saveImage = this.banner.PC;
    } else if (type === 'Tablet') {
      saveImage = this.banner.Tablet;
    } else if (type === 'Mobile') {
      saveImage = this.banner.Mobile;
    }

    this.vvtkService.patch(
      {
        path: `${this.apiPathPrefix}/Banner`,
        disableLanguage: true
      },
      saveImage,
      {
        next: resp => { },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
}

export class PageDatabase {
  selectedLanguage$: Subscription;

  dataChange: BehaviorSubject<FeatureArticleListItem[]> = new BehaviorSubject<
    FeatureArticleListItem[]
  >([]);
  get data(): FeatureArticleListItem[] {
    return this.dataChange.value;
  }

  dataLength: number;

  years: number[];
  selectedYear: number;

  canGetData = false;

  isLoading = true;

  query = {
    scope: 'all',
    filter: '',
    sort: '',
    order: 'linkText',
    pageIndex: 0,
    start: 0,
    limit: 10
  };
  apiPathPrefix = `api/Supports/Learning/FeatureArticleList`;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private _paginator: MatPaginator
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
    this.query.start = this.query.pageIndex * this.query.limit;
    this.vvtkService.get(
      {
        path: `${this.apiPathPrefix}/List`,
        query: this.query,
        disableLanguage: false
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

  connect(): Observable<FeatureArticleListItem[]> {
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
