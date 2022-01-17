import { OssService } from './../oss.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'vvtk-oss-table',
  templateUrl: './oss-table.component.html',
  styleUrls: ['./oss-table.component.scss']
})

export class OssTableComponent implements OnInit {
  displayedColumns: string[] = ['subCategoryName', 'modelsString', 'announcementLink', 'AnnouncePage'];
  tableData = [];
  dataSource;
  @Input() subCategories;
  constructor(private ossService: OssService) { }
  ngOnInit() {
    this.subCategories.forEach(sub => {
      this.tableData = [...this.tableData, ...sub.models];
    });
    this.dataSource = new MatTableDataSource(this.tableData);
    this.ossService.ossTableFilter$.subscribe(
      filterObj => {
        this.dataSource.filter = JSON.stringify(filterObj);
      });
    this.dataSource.filterPredicate = (data, filterJSON: string): boolean => {
      const filterObj = JSON.parse(filterJSON);
      let flag = true;
      if (Object.keys(filterObj).length === 0) { return true; }
      if (filterObj['subCategoryName'] !== undefined && filterObj['subCategoryName'] !== '') {
        flag = flag && data.subCategoryName.toLowerCase() === filterObj['subCategoryName'];
      }
      if (filterObj['modelsString'] !== undefined && filterObj['modelsString'] !== '') {
        flag = flag && data.modelsString.toLowerCase().includes(filterObj['modelsString']);
      }
      return flag;
    };
  }
}
