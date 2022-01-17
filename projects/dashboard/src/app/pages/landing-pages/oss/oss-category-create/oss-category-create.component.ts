import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { validator } from './oss-category-create-validator';

@Component({
  selector: 'vvtk-oss-category-create',
  templateUrl: './oss-category-create.component.html',
  styleUrls: ['./oss-category-create.component.scss']
})

export class OssCategoryCreateComponent implements OnInit {
  form = new FormGroup({
    mode: new FormControl('main'),
    mainCategoryName: new FormControl(''),
    mainCategoryId: new FormControl(''),
    subCategoryName: new FormControl(''),
  }, { validators: validator });
  isMain = true;
  isLoading: boolean;
  pageIsEditable: boolean;
  mainCategoryRef = [];
  constructor(private vvtkService: VvtkService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getCategory();
  }
  updateMode(e: any) {
    this.isMain = e.value === 'main' ? true : false;
  }
  getCategory() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/OSS/Category/List`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json() || [];
          this.mainCategoryRef = body;
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
  onSubmit() {
    this.isLoading = true;
    let targetUrl: string;
    const postData = <{
      // Main CategoryName or Subcategory Name
      categoryName: string,
      // Main category Id, only needed when user create a new subcategory.
      categoryId?: number
    }>{};
    if (this.isMain) {
      targetUrl = 'api/OSS/Category/Create';
      postData['categoryName'] = this.form.value.mainCategoryName;
    } else {
      targetUrl = 'api/OSS/SubCategory/Create';
      postData['categoryName'] = this.form.value.subCategoryName;
      postData['categoryId'] = +this.form.value.mainCategoryId;
    }
    this.vvtkService.post(
      {
        path: targetUrl,
        disableLanguage: true,
      }, postData,
      {
        next: resp => {
          this.router.navigate(['/landing-pages/oss/category']);
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
}
