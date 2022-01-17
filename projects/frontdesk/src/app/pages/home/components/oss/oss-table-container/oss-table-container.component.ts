import { OssService } from './../oss.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'vvtk-oss-table-container',
  templateUrl: './oss-table-container.component.html',
  styleUrls: ['./oss-table-container.component.scss']
})
export class OssTableContainerComponent implements OnInit {
  public mainCategoryList: Array<string> = [];
  public subCategoryList: Array<string> = [];
  categoryList = [];
  filterObj = {};
  constructor(private ossService: OssService) {
    this.ossService.ossTableData$.subscribe(
      tableDataList => {
        this.categoryList = tableDataList;
        // 產生 MainCategory selector 的 options
        tableDataList.forEach(tabledata => {
          if (!this.mainCategoryList.includes(tabledata.categoryName)) {
            this.mainCategoryList = [...this.mainCategoryList, tabledata.categoryName];
          }
          // 產生 SubCategory selector 的 options
          tabledata.subCategories.forEach(sub => {
            if (!this.subCategoryList.includes(sub.subCategoryName)) {
              this.subCategoryList = [...this.subCategoryList, sub.subCategoryName];
            }
          });
        });
      });
  }

  ngOnInit() {
    this.ossService.getTableData();
  }

  updateMainCategoryFilter(filterValue: string | null) {
    if (filterValue === '') {
      return this.categoryList.forEach(tableData => tableData.isShow = true);
    }
    filterValue = filterValue.trim().toLowerCase();
    this.categoryList.forEach(tableData => {
      tableData.categoryName.trim().toLowerCase() === filterValue ? tableData.isShow = true : tableData.isShow = false;
    });
  }
  updateSubCatrgoryFilter(filterValue: string) {
    if (filterValue !== undefined) { filterValue = filterValue.trim().toLowerCase(); }
    this.filterObj['subCategoryName'] = filterValue;
    this.ossService.updateTableFilter(this.filterObj);
  }
  updateModelFilter(filterValue: string) {
    if (filterValue !== undefined) { filterValue = filterValue.trim().toLowerCase(); }
    this.filterObj['modelsString'] = filterValue;
    this.ossService.updateTableFilter(this.filterObj);
  }
}
