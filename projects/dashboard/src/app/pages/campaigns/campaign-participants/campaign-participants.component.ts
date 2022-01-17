import { DataSource } from '@angular/cdk/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatPaginator,
  MatSort
} from '@angular/material';
import { BehaviorSubject, Observable, merge as observableMerge } from 'rxjs';
import { map } from 'rxjs/operators';
import { CampaignParticipant } from '../../../vvtk-core/classes/campaignParticipant';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

declare var moment: any;

export class PageDatabase {
  dataChange: BehaviorSubject<CampaignParticipant[]> = new BehaviorSubject<
    CampaignParticipant[]
  >([]);
  get data(): CampaignParticipant[] {
    return this.dataChange.value;
  }

  constructor(
    private id: number,
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.getData();
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Campaign/Participants/List/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.dataChange.next(body.list);
        }
      }
    );
  }
}

export class PageDataSource extends DataSource<any> {
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
  connect(): Observable<CampaignParticipant[]> {
    const displayDataChanges = [
      this._database.dataChange,
      this._sort.sortChange,
      this._paginator.page
    ];

    return observableMerge(...displayDataChanges).pipe(
      map(() => {
        let data = this._database.data.slice();
        data = this.getSortedData(data);
        this._dataLength = data.length;
        data = this.getPaginator(data);
        return data;
      })
    );
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(data: CampaignParticipant[]): CampaignParticipant[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'phone':
          [propertyA, propertyB] = [a.phone, b.phone];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  getPaginator(data: CampaignParticipant[]): CampaignParticipant[] {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }
}

@Component({
  selector: 'vvtk-campaign-participants',
  templateUrl: './campaign-participants.component.html',
  styleUrls: ['./campaign-participants.component.scss']
})
export class CampaignParticipantsComponent implements OnInit {
  id: number;
  title: string;

  displayedColumns = ['name', 'phone', 'email'];
  database: PageDatabase;
  dataSource: PageDataSource | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<CampaignParticipantsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService
  ) {
    this.id = data.id;
    this.title = data.title;
  }

  ngOnInit() {
    this.database = new PageDatabase(
      this.id,
      this.vvtkService,
      this.sharedService
    );
    this.dataSource = new PageDataSource(
      this.database,
      this.sort,
      this.paginator
    );
  }

  download() {
    const dataArray = this.convertToArray(this.database.data);
    dataArray.unshift(['Name', 'Phone', 'Email', 'Create at']);

    this.toolsService.downloadExcel(
      [
        {
          sheetName: 'Sheet1',
          dataArray: dataArray
        }
      ],
      this.title + ' - ' + moment(new Date()).format()
    );
  }

  convertToArray(objArray) {
    const array =
      typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    const newArray: string[][] = [];

    for (let i = 0; i < array.length; i++) {
      const row: string[] = [];
      // tslint:disable-next-line:forin
      for (const index in array[i]) {
        row.push(array[i][index]);
      }
      newArray.push(row);
    }
    return newArray;
  }
}
