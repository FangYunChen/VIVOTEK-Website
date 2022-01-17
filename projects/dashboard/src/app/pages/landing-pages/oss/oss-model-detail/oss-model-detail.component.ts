import { ToolsService } from './../../../../vvtk-core/services/tools.service';
import { SharedService } from './../../../../vvtk-core/services/shared.service';
import { VvtkService } from './../../../../vvtk-core/services/vvtk.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-oss-model-detail',
  templateUrl: './oss-model-detail.component.html',
  styleUrls: ['./oss-model-detail.component.scss']
})
export class OssModelDetailComponent implements OnInit {
  pageIsEditable: boolean;
  modelForm: FormGroup;
  initData = {};
  categoryOptions = {};
  isLoading = false;
  categoryList = [];
  subCategoryList;
  modelId = this.route.snapshot.paramMap.get('id');
  selectedMainId;
  isSubSelectorDisable = false;
  constructor(
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router,
    private toolsService: ToolsService,
  ) { }
  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.getModel();
    this.modelForm = new FormGroup({
      categoryId: new FormControl('', Validators.required),
      subCategoryId: new FormControl('', Validators.required),
      modelsString: new FormControl('', Validators.required),
      announcementLink: new FormControl('', Validators.required),
      sourceCodeLink: new FormControl('', Validators.required)
    });
  }
  getModel() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/OSS/Model/${this.modelId}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json() || [];
          if (body.length === 0) {
            this.router.navigate(['/landing-pages/oss/model']);
            return this.toolsService.showSnackBar('Model doesn\'t exist.');
          }
          this.initData = body;
          this.getCategory();
        },
        finally: () => {
          this.isLoading = false;
        },
      }
    );
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
          this.mainSelectChange(this.initData['categoryId']);
          this.modelForm.patchValue({
            categoryId: this.initData['categoryId'].toString(),
            subCategoryId: this.initData['subCategoryId'].toString(),
            modelsString: this.initData['modelsString'],
            announcementLink: this.initData['announcementLink'],
            sourceCodeLink: this.initData['sourceCodeLink']
          });
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
  mainSelectChange(val: number) {
    const selectedMain = this.categoryList.find(data => +data.id === +val);
    console.log(val, selectedMain);
    if (selectedMain !== undefined && selectedMain) {
      this.subCategoryList = selectedMain['subCategories'];
      // TODO: If users request us to diable the sub category selector while there is no subcategory,
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
    this.vvtkService.patch(
      {
        path: `api/OSS/Model/${this.modelId}`,
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
    this.modelForm.patchValue({
      categoryId: this.initData['categoryId'].toString(),
      subCategoryId: this.initData['subCategoryId'].toString(),
      modelsString: this.initData['modelsString'],
      announcementLink: this.initData['announcementLink'],
      sourceCodeLink: this.initData['sourceCodeLink']
    });
  }
}
