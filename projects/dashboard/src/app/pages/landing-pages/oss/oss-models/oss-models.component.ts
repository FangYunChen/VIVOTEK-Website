import { SharedService } from './../../../../vvtk-core/services/shared.service';
import { VvtkService } from './../../../../vvtk-core/services/vvtk.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource, PageEvent, MatPaginator } from '@angular/material';
@Component({
  selector: 'vvtk-oss-models',
  templateUrl: './oss-models.component.html',
  styleUrls: ['./oss-models.component.scss']
})
export class OssModelsComponent implements OnInit {
  @ViewChild('modelFilter') modelFilter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['categoryName', 'subCategoryName', 'modelsString', 'action'];
  categoryList = [];
  subCategoryList;
  totalCount: number;
  currentFilterData = '';
  mainSelectedValue: string;
  subSelectedValue: string;
  isLoading: boolean;
  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) { }
  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/landing-pages/oss/model/create'
    );
    // Decide if user have permission to view the detail of each model, 0 here represent any digital number
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/landing-pages/oss/model/0'
    );
    this.searchModels();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.searchModels();
    });
    fromEvent(this.modelFilter.nativeElement, 'keyup')
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((e: Event) => {
        const ele = <HTMLInputElement>e.target;
        if (ele.value !== this.currentFilterData) {
          this.currentFilterData = ele.value;
          this.searchModels();
        }
      });
    this.getCategory();
  }
  getCategory() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/OSS/Categories`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json() || [];
          this.categoryList = body;
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
  mainSelectChange(val) {
    // If main selector is choosen to option 'N/A', empty the subcategory option list and updated the table data.
    if (val === '') {
      this.subCategoryList = null;
      this.mainSelectedValue = null;
      return this.searchModels();
    }
    const selectedMain = this.categoryList.find(data => +data.id === +val);
    if (selectedMain !== undefined && selectedMain) {
      this.subCategoryList = selectedMain['subCategories'];
    }
    this.subSelectedValue = null;
    this.mainSelectedValue = val;
    this.searchModels();
  }
  subSelectChange(val) {
    this.subSelectedValue = val;
    this.searchModels();
  }
  searchModels() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/OSS/Models`,
        disableLanguage: true,
        query: {
          main: this.mainSelectedValue || '',
          sub: this.subSelectedValue || '',
          modelString: this.modelFilter.nativeElement.value,
          pageIndex: this.paginator.pageIndex || 0,
          pageSize: this.paginator.pageSize || 10,
        }
      },
      {
        next: resp => {
          const body = resp.json();
          this.dataSource.data = body['modelList'];
          this.totalCount = body['totalCount'];
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
  removeModel(id) {
    this.isLoading = true;
    this.vvtkService.delete(
      {
        path: `api/OSS/Model/${id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          this.searchModels();
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
}
