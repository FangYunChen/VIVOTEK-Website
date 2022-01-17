import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';
import { map, finalize, tap } from 'rxjs/operators';
import {
  SupportArticleProductType,
  Tags,
  SupportArticle,
  SupportArticleProductCategoryChildren,
  SupportArticleVideo
} from 'projects/dashboard/src/app/vvtk-core/interface/support-article';
import { Subscription, forkJoin } from 'rxjs';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'vvtk-article-content',
  templateUrl: './article-content.component.html'
})

export class ArticleContentComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  selectedLanguage$: Subscription;
  id = 0;
  article: SupportArticle;
  tagsOptions: CommonSelectOption[] = [];
  productTypeOptions: CommonSelectOption[] = [];
  productTypes: SupportArticleProductType[] = [];
  ProdIdCategoriesMap = new Map<number, CommonSelectOption[]>();
  isLoading = false;
  path = 'Support/Articles';

  get isAddData() {
    return this.id === 0;
  }

  groupOptionsVideo: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 150
  };

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.article = {
      type: 1,
      headline: '',
      publishedAt: new Date(),
      subRoute: '',
      lead: '',
      content: '',
      createdAt: '',
      tags: [],
      categories: [],
      selectedTagsArray: [],
      videos: []
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getSupportTagsList();
    this.getSupportProductTypesList();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (!this.isAddData) {
        this.getSelectedLanguage();
      }
    });
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getSupportArticle();
      }
    );
  }

  getSupportArticle() {
    this.isLoading = true;
    this.vvtkApiService.get<SupportArticle>({
      path: `api/support/articles/${this.id}`,
      disableLanguage: false
    }).subscribe(
      res => {
        this.article = res;
        // 若沒有videos，api會回傳null
        this.article.videos = this.article.videos || [];

        // 將tags物件陣列放入tagsArray數字陣列
        this.article.selectedTagsArray = this.article.selectedTagsArray || [];
        this.article.tags.forEach(x => {
          this.article.selectedTagsArray.push(x.id);
        });

        if (res.productTypes.length > 0) {
          this.getFullProductTypeAndCategoryInfo(res.productTypes, res.categories);
        } else {
          this.isLoading = false;
        }
      }
    );
  }

  /**
   * 取得完整的 ProductType 和其 Categories 資訊
   * @param productTypes
   * @param selectedCategories
   */
  private getFullProductTypeAndCategoryInfo(productTypes: number[], selectedCategories: number[]) {
    const observables = productTypes.map(productTypeId => {
      return this.getProductTypeById(productTypeId)
        .pipe(
          tap(productType => {
            const categoryOption = this.ProdIdCategoriesMap.get(productTypeId);
            productType.selectedCategories = selectedCategories
              .filter(x => categoryOption.some(o => o.value === x));

            this.productTypes.push(productType);
          })
        );
    });
    forkJoin(observables).subscribe(() => {
      this.isLoading = false;
    });
  }

  private getProductTypeById(id) {
    return this.vvtkApiService.get<SupportArticleProductType>({
      path: `api/support/productTypes/${id}`,
      disableLanguage: false
    }).pipe(
      tap(productType => {
        const categoryOption = this.mapProductCategoriesToArray(productType.categories).map(category => <CommonSelectOption>{
          value: category.id,
          optionText: category.name
        });
        this.ProdIdCategoriesMap.set(id, categoryOption);
      })
    );
  }

  productTypeChanged(productTypeId: number) {
    this.getProductTypeById(productTypeId).subscribe();
  }

  getSupportTagsList() {
    this.vvtkApiService.get<Tags[]>({
      path: `api/support/tags`,
      disableLanguage: false
    }).pipe(map(tags => {
      return tags.map(tag => <CommonSelectOption>{
        optionText: tag.name,
        value: tag.id
      });
    })).subscribe(
      tags => this.tagsOptions = tags
    );
  }

  getSupportProductTypesList() {
    this.vvtkApiService.get<SupportArticleProductType[]>({
      path: `api/support/productTypes`,
      disableLanguage: false
    }).pipe(map(productTypes => {
      return productTypes.map(productType => <CommonSelectOption>{
        optionText: productType.name,
        value: productType.id
      });
    })).subscribe(
      productTypes => this.productTypeOptions = productTypes
    );
  }

  private mapProductCategoriesToArray(productCategories: SupportArticleProductCategoryChildren[], spaceCount = 0)
    : SupportArticleProductCategoryChildren[] {
    const space = '　　'.repeat(spaceCount);
    const result: SupportArticleProductCategoryChildren[] = [];
    (productCategories || []).forEach(category => {
      category.name = space + category.name;
      result.push(category);
      if (category.children && category.children.length > 0) {
        const children = this.mapProductCategoriesToArray(category.children, spaceCount + 1);
        result.push(...children);
      }
    });
    return result;
  }

  addProductType() {
    this.productTypes = this.productTypes || [];
    this.productTypes.push({
      name: '',
      categories: []
    });
  }

  deleteProductType(productType: SupportArticleProductType) {
    this.productTypes = this.productTypes.filter(x => x !== productType);
  }

  addVideo() {
    this.article.videos.push({
      title: '',
      link: '',
      hideContent: false
    });
  }

  deleteVideo(video: SupportArticleVideo) {
    this.article.videos = this.article.videos || [];
    this.article.videos = this.article.videos.filter(x => x !== video);
  }

  save() {
    this.isLoading = true;

    // 將selected tags 放回 article tags
    this.article.tags = this.article.selectedTagsArray.map(x => ({ id: x }));

    // 將selected productType 放回 article productType number array
    this.article.productTypes = this.productTypes.map(x => x.id);

    // 將selected catrgories 放回 article categories number array
    const categoriesArray: number[] = [];
    this.productTypes.forEach(x => {
      x.selectedCategories = x.selectedCategories || [];
      x.selectedCategories.forEach(categoryId => {
        if (categoriesArray.indexOf(categoryId) < 0) {
          categoriesArray.push(categoryId);
        }
      });
    });
    this.article.categories = categoriesArray;

    if (this.isAddData) {
      this.articleCreate();
    } else {
      this.articleUpdate();
    }
  }

  articleCreate() {
    this.vvtkApiService.post({
      path: `api/support/articles`,
      disableLanguage: true
    }, this.article).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.router.navigate(['/supports/article'])
    );
  }

  articleUpdate() {
    this.vvtkApiService.patch({
      path: `api/support/articles/${this.id}`,
      disableLanguage: false
    }, this.article).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.router.navigate(['/supports/article'])
    );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }

}
