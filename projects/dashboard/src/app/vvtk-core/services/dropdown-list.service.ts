import { Injectable } from '@angular/core';
import { VvtkApiService } from './vvtk-api.service';
import { ProductCategory } from '../interface/product-category';
import { CommonSelectOption, BackendSelectedItem } from '../interface/common-model';
import { map } from 'rxjs/operators';
import { Language } from '../interface/language';

@Injectable({
  providedIn: 'root'
})
export class DropdownListService {

  private get productCategories$() {
    return this.vvtkApiService.get<ProductCategory[]>({
      path: `api/Product/Categories`
    });
  }

  constructor(private vvtkApiService: VvtkApiService) { }

  getAllProductOptions() {
    return this.vvtkApiService.get<BackendSelectedItem[]>({
      path: `api/Products/SelectListItems`,
      disableLanguage: true
    }).pipe(
      map(items => {
        return items.map(item => <CommonSelectOption>{
          value: item.id,
          optionText: item.name
        });
      })
    );
  }

  getAllProductCategories() {
    return this.productCategories$.pipe(
      map(categories => this.mapProductCategoryToArray(categories))
    );
  }

  getProductCategoryOptions() {
    return this.productCategories$
      .pipe(map(categories => {
        return this.mapProductCategoryToArray(categories).map(category => <CommonSelectOption>{
          value: category.id,
          optionText: category.name,
        });
      }));
  }

  private mapProductCategoryToArray(
    categories: ProductCategory[],
    spaceCount = -1,
  ): ProductCategory[] {
    if (categories) {
      spaceCount++;
      const space = '　'.repeat(spaceCount);
      let result: ProductCategory[] = [];
      categories.forEach(category => {
        category.name = space + category.name;
        category.allChildrenIds = category.allChildrenIds || [];
        result.push(category);
        if (category.children && category.children.length > 0) {
          const children = this.mapProductCategoryToArray(category.children, spaceCount);
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

  getAllLangOptions() {
    return this.vvtkApiService.get<Language[]>({
      path: 'api/Languages',
      disableLanguage: true,
      query: {
        scope: 'all'
      }
    }).pipe(map(languages => {
      return languages.map(lang => <CommonSelectOption>{
        optionText: lang.name,
        value: lang.code
      });
    }));
  }

}
