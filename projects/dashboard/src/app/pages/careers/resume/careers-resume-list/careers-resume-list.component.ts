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
import { CareersResume } from '../../../../vvtk-core/classes/careers';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

declare const moment;

export class PageDatabase {
  selectedLanguage$: Subscription;

  dataChange: BehaviorSubject<CareersResume[]> = new BehaviorSubject<
    CareersResume[]
  >([]);
  get data(): CareersResume[] {
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
      { path: `api/Careers/Resume/List` },
      {
        next: resp => {
          const body = resp.json() || [];
          const zone = moment.parseZone(new Date()).utcOffset();
          body.forEach((item: CareersResume) => {
            item.createdAt = moment(item.createdAt).add(zone, 'minutes');
            if (!item.states) {
              item.states = {
                id: 0,
                name: ''
              };
            }
          });
          this.dataChange.next(body);
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
  connect(): Observable<CareersResume[]> {
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

  getFilterData(data: CareersResume[]): CareersResume[] {
    return data.filter((item: CareersResume) => {
      const searchStr = (
        item.id +
        item.name +
        item.vacancy.name +
        item.country.name +
        item.states.name +
        moment(item.createdAt).format('YYYY/MM/DD HH:mm')
      ).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(data: CareersResume[]): CareersResume[] {
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
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'vacancy':
          [propertyA, propertyB] = [a.vacancy.name, b.vacancy.name];
          break;
        case 'country':
          [propertyA, propertyB] = [a.country.name, b.country.name];
          break;
        case 'states':
          [propertyA, propertyB] = [a.states.name, b.states.name];
          break;
        case 'createdAt':
          [propertyA, propertyB] = [a.createdAt, b.createdAt];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  getPaginator(data: CareersResume[]): CareersResume[] {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }
}

@Component({
  selector: 'vvtk-careers-resume-list',
  templateUrl: './careers-resume-list.component.html',
  styleUrls: ['./careers-resume-list.component.scss']
})
export class CareersResumeListComponent implements OnInit, OnDestroy {
  filter$: Subscription;

  displayedColumns = [
    'id',
    'name',
    'vacancy',
    'country',
    'states',
    'createdAt',
    'action'
  ];
  database = new PageDatabase(this.vvtkService, this.sharedService);
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
  }

  ngOnDestroy() {
    this.filter$.unsubscribe();
    this.database.onDestroy();
  }
}
