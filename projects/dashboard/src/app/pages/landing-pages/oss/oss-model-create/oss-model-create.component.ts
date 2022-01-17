import { Router } from '@angular/router';
import { VvtkService } from './../../../../vvtk-core/services/vvtk.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-oss-model-create',
  templateUrl: './oss-model-create.component.html',
  styleUrls: ['./oss-model-create.component.scss']
})
export class OssModelCreateComponent implements OnInit {
  parentContentIsViewable: boolean;
  pageIsEditable: boolean;
  modelForm: FormGroup;
  categoryOptions = {};
  isLoading = false;
  categoryList = [];
  subCategoryList;
  selectedMainId;
  initData;
  isSubSelectorDisable = true;
  constructor(
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) { }
  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.parentContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/landing-pages/oss/model'
    );
    this.getCategory();
    this.modelForm = new FormGroup({
      categoryId: new FormControl('', Validators.required),
      subCategoryId: new FormControl('', Validators.required),
      modelsString: new FormControl('', Validators.required),
      announcementLink: new FormControl('', Validators.required),
      sourceCodeLink: new FormControl('', Validators.required)
    });
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
  mainSelectChange(val: number) {
    const selectedMain = this.categoryList.find(data => +data.id === +val);
    if (selectedMain !== undefined && selectedMain) {
      this.subCategoryList = selectedMain['subCategories'];
      // TODO: If users request us to disable the sub category selector while there is no subcategory,
      // bind isSubSelectorDisable to [disabled] property.
      this.isSubSelectorDisable = this.subCategoryList.length >= 0 ? false : true;
    }
  }

  announcementUpload($event) {
    const file: File = $event.target.files[0];
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `oss/model/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.modelForm.patchValue({
          announcementLink: x.link,
        })
      );
  }

  sourceCodeUpload($event) {
    const file: File = $event.target.files[0];
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `oss/model/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.modelForm.patchValue({
          sourceCodeLink: x.link
        })
      );
  }

  onSubmit() {
    this.isLoading = true;
    this.vvtkService.post(
      {
        path: `api/OSS/Model`,
        disableLanguage: true,
      }, this.modelForm.value
      ,
      {
        next: resp => {
          this.initData = this.modelForm.value;
          this.initData['categoryId'] = +this.initData['categoryId'];
          this.initData['subCategoryId'] = +this.initData['subCategoryId'];
          this.router.navigate(['/landing-pages/oss/model']);
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
  onReset() {
    if (this.initData) {
      this.modelForm.patchValue({
        categoryId: this.initData['categoryId'].toString(),
        subCategoryId: this.initData['subCategoryId'].toString(),
        modelsString: this.initData['modelsString'],
        announcementLink: this.initData['announcementLink'],
        sourceCodeLink: this.initData['sourceCodeLink']
      });
    } else {
      this.modelForm.reset();
    }
  }
}
