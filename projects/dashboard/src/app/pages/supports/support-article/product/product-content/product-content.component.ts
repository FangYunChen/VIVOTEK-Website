import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'projects/dashboard/src/app/vvtk-core/interface/image';
import { LinkImage } from 'projects/dashboard/src/app/vvtk-core/classes/template';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';
import {
  SupportArticleProductType,
  SupportArticleProductCategories,
  SupportArticleProductCategoryChildren
} from 'projects/dashboard/src/app/vvtk-core/interface/support-article';

@Component({
  selector: 'vvtk-product-content',
  templateUrl: './product-content.component.html'
})

export class ProductContentComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  selectedLanguage$: Subscription;
  data: SupportArticleProductType = {} as any;
  id = 0;
  image: LinkImage;
  imageSelectorVisible: boolean;
  isLoading = true;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 150
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {
    this.image = {
      hideContent: false,
      src: '',
      alt: '',
      title: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.getSelectedLanguage();
  }

  uploadFile($event) {
    const file: File = $event.target.files[0];
    this.image.title = file.name;
    this.image.alt = file.name;
    this.vvtkApiService.uploadFile(file, `Support/Article/Product/${file.name}`).pipe(
      finalize(() => $event.target.value = null)
    ).subscribe(
      x => this.image.src = x.link
    );
  }

  displayImageSelector() {
    this.imageSelectorVisible = true;
  }

  setImage(image: Image) {
    this.image.src = image.imagePath;
    this.image.alt = image.name;
    this.image.title = image.name;
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getData();
      }
    );
  }

  getData() {
    if (this.id === 0) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.vvtkApiService.get<any>({
      path: `api/support/productTypes/${this.id}`,
      disableLanguage: false
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      this.data = res;
      this.image.src = res.imagePath;
    }
    );
  }

  addChild(category: SupportArticleProductCategories) {
    category.children = category.children || [];
    category.children.push({ name: '' });
  }

  addCategory() {
    this.data.categories = this.data.categories || [];
    this.data.categories.push({
      name: '',
      children: []
    });
  }

  deleteCategory(category: SupportArticleProductCategories) {
    this.data.categories = this.data.categories.filter(x => x !== category);
  }

  deleteChild(category: SupportArticleProductCategories, child: SupportArticleProductCategoryChildren) {
    category.children = category.children.filter(x => x !== child);
  }

  save() {
    this.data.imagePath = this.image.src;
    this.isLoading = true;
    this.getSequenceCategories(this.data.categories);
    const save$ = this.id === 0 ? this.createProductType() : this.updateProductType();
    save$.pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(x => this.router.navigate(['/supports/article/product']));
  }

  private createProductType() {
    return this.vvtkApiService.post(
      {
        path: `api/support/productTypes`,
        disableLanguage: true
      },
      this.data
    );
  }

  private updateProductType() {
    return this.vvtkApiService.patch(
      {
        path: `api/support/productTypes/${this.id}`,
        disableLanguage: false
      },
      this.data
    );
  }

  getSequenceCategories(categories: SupportArticleProductCategories[]) {
    // (categories || []).forEach((category, categoryIdx) => {
    //   category.displayOrder = categoryIdx + 1;
    //   (category.children || []).forEach((child, childIdx) => {
    //     child.displayOrder = childIdx + 1;
    //   });
    // });

    let categorySeq = 1;
    for (const category of categories) {
      category.displayOrder = categorySeq;
      categorySeq++;

      let childSeq = 1;
      for (const child of category.children) {
        child.displayOrder = childSeq;
        childSeq++;
      }
    }
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}

