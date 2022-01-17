import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'projects/dashboard/src/app/vvtk-core/interface/product-category';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'vvtk-product-selector-setting',
  templateUrl: './product-selector-setting.component.html',
  styleUrls: ['./product-selector-setting.component.scss']
})
export class ProductSelectorSettingComponent implements OnInit {

  get pageIsEditable() {
    return this.sharedService.pageIsEditable;
  }

  isLoading;

  productCategories: ProductCategory[] = [];
  displayedColumns = [
    'isDisplayOnSelector',
    'name'
  ];

  constructor(
    private sharedService: SharedService,
    private vvtkApiService: VvtkApiService
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.isLoading = true;
    this.vvtkApiService.get<ProductCategory[]>({
      path: `api/Product/Categories`
    }).pipe(
      finalize(() => this.isLoading = false),
      map(categories => this.mapCategoryToArray(categories))
    ).subscribe(categories => this.productCategories = categories);
  }

  private mapCategoryToArray(categories: ProductCategory[], spaceCount = -1): ProductCategory[] {
    if (categories) {
      spaceCount++;
      const space = '　'.repeat(spaceCount);
      let result: ProductCategory[] = [];
      categories.forEach(category => {
        category.name = space + category.name;
        category.allChildrenIds = category.allChildrenIds || [];
        result.push(category);
        if (category.children && category.children.length > 0) {
          const children = this.mapCategoryToArray(category.children, spaceCount);
          category.allChildrenIds = Array.from(new Set(
            children.map(x => ([x.id, ...x.allChildrenIds])).reduce((pre, cur) => pre.concat(cur)))
          );
          result = [...result, ...children];
        }
      });
      return result;
    }
    return [];
  }

  checkChange(categoryId: number, checkValue: boolean) {
    const checkCategory = this.productCategories.find(x => x.id === categoryId);
    if (checkCategory) {
      if (checkValue) {
        this.productCategories.forEach(category => {
          // 兒子勾，父親跟著勾
          if (category.allChildrenIds.includes(categoryId)) {
            category.isDisplayOnSelector = checkValue;
          }
          // 父親勾，兒子跟著勾
          if (checkCategory.allChildrenIds.find(x => x === category.id)) {
            category.isDisplayOnSelector = checkValue;
          }
        });
      } else {
        // 父親取消，兒子跟著取消
        const cancels = checkCategory.allChildrenIds;
        this.productCategories.forEach(category => {
          if (cancels.includes(category.id)) {
            category.isDisplayOnSelector = checkValue;
          }
        });
      }
    }
  }

  save() {
    this.isLoading = true;
    this.vvtkApiService.patch({
      path: `api/Product/Categories/ChangeDisplaySettingOnSelector`,
      disableLanguage: true
    }, this.postData).pipe(
      finalize(() => this.isLoading = false),
    ).subscribe();
  }

  private get postData() {
    return this.productCategories.map(
      category => ({
        id: category.id,
        isDisplayOnSelector: category.isDisplayOnSelector
      })
    );
  }

}
