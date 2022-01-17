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
import { Contact } from '../../../vvtk-core/classes/contact';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

declare var moment: any;

export class PageDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  _statusChange = new BehaviorSubject(0);
  get status(): number {
    return this._statusChange.value;
  }
  set status(status: number) {
    this._statusChange.next(status);
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
  connect(): Observable<Contact[]> {
    const displayDataChanges = [
      this._database.dataChange,
      this._statusChange,
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

  getFilterData(data: Contact[]): Contact[] {
    data = data.filter((item: Contact) => {
      return item.status === this.status;
    });
    return data.filter((item: Contact) => {
      const searchStr = (
        item.id +
        item.subject.name +
        moment(item.createdAt).format('YYYY/MM/DD') +
        item.email +
        item.firstName +
        ' ' +
        item.lastName
      ).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(data: Contact[]): Contact[] {
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
        case 'createdAt':
          [propertyA, propertyB] = [a.createdAt, b.createdAt];
          break;
        case 'subject':
          [propertyA, propertyB] = [a.subject.name, b.subject.name];
          break;
        case 'name':
          [propertyA, propertyB] = [
            `${a.firstName} ${a.lastName}`,
            `${b.firstName} ${b.lastName}`
          ];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        case 'updatedUser':
          [propertyA, propertyB] = [a.updatedUser.name, b.updatedUser.name];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  getPaginator(data: Contact[]): Contact[] {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }
}

export class PageDatabase {
  selectedLanguage$: Subscription;

  dataChange: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
  get data(): Contact[] {
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
      { path: `api/Contact/Forms/List` },
      {
        next: resp => {
          const body = resp.json() || [];
          const zone = moment.parseZone(new Date()).utcOffset();
          body.forEach((contact: Contact) => {
            contact.subject = contact.subject || {
              id: 0,
              name: ''
            };
            contact.handler = contact.handler || [];
            contact.createdAt = moment(contact.createdAt).add(zone, 'minutes');
            contact.updatedAt = moment(contact.updatedAt).add(zone, 'minutes');
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

@Component({
  selector: 'vvtk-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsViewable: boolean;

  filter$: Subscription;

  displayedColumns = [
    'id',
    'subject',
    'createdAt',
    'name',
    'email',
    'handler',
    'action'
  ];
  database = new PageDatabase(this.vvtkService, this.sharedService);
  dataSource: PageDataSource | null;

  status = 0;

  lockDelete = false;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/contact/content/0'
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
  }

  changeStatus() {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.status = this.status;
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
            path: `api/Contact/Form/${id}`,
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

  download() {
    // this.database.data
    // 未處理
    const dataArray0: string[][] = [];
    dataArray0.push([
      'ID',
      'Subject',
      'Created At',
      'First Name',
      'Last Name',
      'Email',
      'Company',
      'Phone',
      'Country',
      'Comment',
      'Handler',
      'Update User',
      'Updata At',
      'Note'
    ]);

    // 已處理
    const dataArray1: string[][] = [];
    dataArray1.push([
      'ID',
      'Subject',
      'Created At',
      'First Name',
      'Last Name',
      'Email',
      'Company',
      'Phone',
      'Country',
      'Comment',
      'Update User',
      'Updata At',
      'Note'
    ]);

    this.database.data.forEach(item => {
      if (item.status === 0) {
        const handler: string = item.handler
          .map(handlerItem => {
            return handlerItem.name;
          })
          .join(', ');
        dataArray0.push([
          item.id,
          item.subject.name,
          moment(item.createdAt).format('YYYY/MM/DD HH:mm:ss'),
          item.firstName,
          item.lastName,
          item.email,
          item.company,
          item.phone,
          item.country.name,
          item.comment,
          handler,
          item.updatedUser ? item.updatedUser.name : '',
          item.updatedUser
            ? moment(item.updatedAt).format('YYYY/MM/DD HH:mm:ss')
            : '',
          item.note ? item.note : ''
        ]);
      } else if (item.status === 1) {
        dataArray1.push([
          item.id,
          item.subject.name,
          moment(item.createdAt).format('YYYY/MM/DD HH:mm:ss'),
          item.firstName,
          item.lastName,
          item.email,
          item.company,
          item.phone,
          item.country.name,
          item.comment,
          item.updatedUser ? item.updatedUser.name : '',
          item.updatedUser
            ? moment(item.updatedAt).format('YYYY/MM/DD HH:mm:ss')
            : '',
          item.note ? item.note : ''
        ]);
      }
    });

    this.toolsService.downloadExcel(
      [
        {
          sheetName: 'Not Processed',
          dataArray: dataArray0
        },
        {
          sheetName: 'Processed',
          dataArray: dataArray1
        }
      ],
      'Contact List - ' + moment(new Date()).format()
    );
  }

  ngOnDestroy() {
    this.filter$.unsubscribe();
    this.database.onDestroy();
  }
}
