import { Injectable } from '@angular/core';
import { ReplaySubject, throwError, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { TryJSON } from '@frontdesk/core/utils/json-utils';
import { VvtkApiService, I18nService } from '@frontdesk/core/services';
import {
  ProductSelectorResultCategory,
  ProductSelectorResultProduct
} from '../components/product-selector-result/product-selector-result-model';
import { ProductSelectorCategoryModel } from '../components/product-selector-category/product-selector-category-model';
import {
  ProductSelectorSpecificationModel,
  ProductSelectorType
} from '../components/product-selector-specification/product-selector-specification-model';
import { ProductSelectorFilterModel } from '../components/product-selector-filter/product-selector-filter-model';
import { getProductUrlByName } from '@frontdesk/core/utils/product-utils';

@Injectable({
  providedIn: 'root'
})
export class ProductSelectorService {
  categories$ = new ReplaySubject<ProductSelectorCategoryModel[]>(1);
  specDataMap = new Map<number, ProductSelectorSpecificationModel[]>();
  products: ProductSelectorResultCategory[];
  set searchKeyword(value: string) {
    this._searchKeyword = (value || '').toLowerCase();
    this.filterProducts();
  }
  get searchKeyword() {
    return this._searchKeyword;
  }
  compareProducts: ProductSelectorResultProduct[] = [];

  private _searchKeyword = '';
  private _categorySpecMap = new Map<number, number>();
  private allSpecSelectors: ProductSelectorSpecificationModel[];

  constructor(
    private vvtkApiService: VvtkApiService,
    private i18nService: I18nService
  ) { }

  loadProductCategories() {
    this.vvtkApiService.get<ProductSelectorCategoryModel[]>({
      path: 'api/Product/Categories/DisplayOnSelector'
    }).subscribe(
      data => {
        this.updateHasSpecInfo(data);
        this.categories$.next(data);
      }
    );
  }

  private updateHasSpecInfo(categories: ProductSelectorCategoryModel[]) {
    (categories || []).forEach(category => {
      if (category.hasSpec) {
        category.categoryIdWhichHasSpec = category.id;
        this._categorySpecMap.set(category.id, category.categoryIdWhichHasSpec);
      }
      (category.children || []).forEach(child => {
        child.categoryIdWhichHasSpec = category.categoryIdWhichHasSpec;
        this._categorySpecMap.set(child.id, child.categoryIdWhichHasSpec);
      });
      this.updateHasSpecInfo(category.children);
    });
  }

  /**
   * 依類別網址載入產品資料
   * @param path ex. network-camera/multi-sensor
   * @returns boolean (成功: true, 失敗: throwError)
   */
  loadProductsByPath(path: string) {
    return this.categories$.pipe(take(1)).pipe(
      switchMap(categories => {
        try {
          const categoryId = this.getCategoryIdByPath(categories, path);
          this.loadProductsByCategoryId(categoryId);
          return of(true);
        } catch (error) {
          console.warn(`Can not found category by path '${path}'`);
          return throwError({ categories, error });
        }
      })
    );
  }

  private getCategoryIdByPath(categories: ProductSelectorCategoryModel[], path: string) {
    const paths = path.split('/').filter((x, i) => i > 0 || !!x);
    const category = categories.find(x => x.subRoute === paths[0]);
    if (category) {
      if (paths.length >= 2 && (category.children || []).length) {
        const subPaths = paths.filter((value, index) => index > 0).join('/');
        return this.getCategoryIdByPath(category.children, subPaths);
      } else {
        return category.id;
      }
    } else {
      throw new Error('category not found!');
    }
  }

  private loadProductsByCategoryId(id: number) {
    this.vvtkApiService.get<ProductSelectorResultCategory[]>({
      path: 'api/Products/SelectorContents',
      query: `categoryId=${id}`,
      disableLanguage: true
    }).subscribe(
      data => {
        this.products = this.mergeProductsToLevel2(data);
        this.products = this.distinctProducts(this.products);
        this.updateProductUrlInfo();
        this.updateAllSelectorsByCategoryId(id);
        this.filterProducts();
      }
    );
  }

  /**
   * 將 API 回傳的 Products 資料合併到第二層分類
   * @param data
   */
  private mergeProductsToLevel2(data: ProductSelectorResultCategory[]): ProductSelectorResultCategory[] {
    return [].concat(
      ...(data || []).map(category => [category || []].concat(
        ...(category.children || []).map(child => {
          child.displayName = child.name;
          child.products = (child.products || []).concat(
            this.convertProductFromTreeToArray(child.children)
          );
          return child;
        })
      ))
    );
  }

  private distinctProducts(data: ProductSelectorResultCategory[]): ProductSelectorResultCategory[] {
    return (data || []).map(d => ({
      ...d,
      products: d.products.reduce(
        (pre, cur) => pre.some(x => x.id === cur.id) ? pre : [...pre, cur],
        [] as ProductSelectorResultProduct[]
      )
    }));
  }

  private updateProductUrlInfo() {
    this.i18nService.selectedLanguage$.pipe(take(1)).subscribe(lang => {
      (this.products || []).forEach(category => {
        (category.products || []).forEach(product => {
          product.url = getProductUrlByName(product.name, lang);
        });
      });
    });
  }

  private convertProductFromTreeToArray(data: ProductSelectorResultCategory[]) {
    return [].concat(
      ...(data || []).map(category => {
        return (category.products || [])
          .concat(this.convertProductFromTreeToArray(category.children));
      })
    );
  }

  private filterProducts() {
    (this.products || []).map(category => {
      category.filteredProducts = this.filterProductsByCategory(
        (category.products || []).filter(x => x.name.toLowerCase().includes(this.searchKeyword))
      );
      return category;
    });
  }

  private filterProductsByCategory(products: ProductSelectorResultProduct[]) {
    return this.allSpecSelectors.reduce(
      (filteredProducts, specItem) => {
        return this.filterProductsBySelectors(filteredProducts, specItem);
      },
      products
    );
  }

  private filterProductsBySelectors(products: ProductSelectorResultProduct[], specItem: ProductSelectorSpecificationModel) {
    return (specItem && specItem.allSelectorOptions || []).reduce(
      (filteredProducts, selector) => {
        if (selector && selector.isFilter && selector.model) {
          switch (specItem.selectorType) {
            case ProductSelectorType.Single:
              if (selector.model.singleValue) {
                return this.filterProductsByCheckBooleanContent(filteredProducts, selector);
              }
              break;
            case ProductSelectorType.Multiple:
              if (selector.model.multipleValue) {
                return this.filterProductsByCheckBooleanContent(filteredProducts, selector);
              }
              break;
            case ProductSelectorType.Range:
              if (
                (
                  typeof selector.model.rangeMinValue === 'number' &&
                  typeof selector.minimum === 'number' &&
                  selector.model.rangeMinValue > selector.minimum
                ) ||
                (
                  typeof selector.model.rangeMaxValue === 'number' &&
                  typeof selector.maximum === 'number' &&
                  selector.model.rangeMaxValue < selector.maximum
                )
              ) {
                return this.filterProductsByCheckRangeContent(filteredProducts, selector);
              }
              break;
            case ProductSelectorType.YesNo:
              if (selector.model.yesNoValue) {
                return this.filterProductsByCheckBooleanContent(filteredProducts, selector);
              }
              break;
          }
        }
        return filteredProducts;
      },
      products
    );
  }

  private filterProductsByCheckBooleanContent(products: ProductSelectorResultProduct[], selector: ProductSelectorFilterModel) {
    return products.filter(product => {
      return (product.selectorOptions || []).some(
        option => {
          if (option.id !== selector.id) {
            return false;
          }
          if (option.contentObj === undefined) {
            option.contentObj = TryJSON.parse(option.content);
          }
          return !!option.contentObj;
        }
      );
    });
  }

  private filterProductsByCheckRangeContent(products: ProductSelectorResultProduct[], selector: ProductSelectorFilterModel) {
    return products.filter(product => {
      return (product.selectorOptions || []).some(
        option => {
          if (option.id !== selector.id) {
            return false;
          }
          if (option.contentObj === undefined) {
            option.contentObj = TryJSON.parse(option.content);
          }
          return (
            option.contentObj &&
            (
              typeof option.contentObj.minimum === 'number' &&
              typeof selector.model.rangeMaxValue === 'number' &&
              option.contentObj.minimum <= selector.model.rangeMaxValue
            ) &&
            (
              typeof option.contentObj.maximum === 'number' &&
              typeof selector.model.rangeMinValue === 'number' &&
              option.contentObj.maximum >= selector.model.rangeMinValue
            )
          );
        }
      );
    });
  }

  updateSelector(specItem: ProductSelectorSpecificationModel, selector: ProductSelectorFilterModel) {
    if (specItem.selectorType === ProductSelectorType.Single) {
      const allSelectorOptions = this.getAllSelectorOptions(specItem.selectorOptions);
      allSelectorOptions.filter(x => x.isFilter).forEach(item => {
        if (item.id === selector.id) {
          item.model.singleValue = !item.model.singleValue;
        } else {
          item.model.singleValue = false;
        }
      });
    }
    this.updateAllSelectorsByCategoryId(specItem.categoryId);
    this.filterProducts();
  }

  private getAllSelectorOptions(data: ProductSelectorFilterModel[]): ProductSelectorFilterModel[] {
    return (data || []).concat(
      ...(data || []).map(
        x => this.getAllSelectorOptions(x.children)
      )
    );
  }

  private updateAllSelectorsByCategoryId(categoryId: number) {
    const categoryIdWhichHasSpec = this._categorySpecMap.get(categoryId);
    const specData = this.specDataMap.get(categoryIdWhichHasSpec);
    if (specData) {
      // 將 specification 和 selector 兩個 tree 結構的資料轉成二維陣列
      this.allSpecSelectors = this.getAllSpecItems(specData);
      this.allSpecSelectors.forEach(specItem => {
        specItem.allSelectorOptions = this.getAllSelectorOptions(specItem.selectorOptions);
      });
    } else {
      this.allSpecSelectors = [];
    }
  }

  private getAllSpecItems(data: ProductSelectorSpecificationModel[]): ProductSelectorSpecificationModel[] {
    return (data || []).concat(
      ...(data || []).map(
        x => this.getAllSpecItems(x.children)
      )
    );
  }

  resetAllSelectorOptions() {
    (this.allSpecSelectors || []).forEach(specItem => {
      if (specItem.isAttribute) {
        (specItem.allSelectorOptions || []).forEach(selector => {
          if (selector.isFilter) {
            selector.model = {};
            if (specItem.selectorType === ProductSelectorType.Range) {
              selector.model.rangeMinValue = selector.minimum;
              selector.model.rangeMaxValue = selector.maximum;
            }
          }
        });
      }
    });
    this.filterProducts();
  }

  addToCompare(product: ProductSelectorResultProduct) {
    if (this.compareProducts.length >= 8) {
      alert('Can only compare up to 8 products!');
      return;
    }
    if (!this.compareProducts.some(x => x.id === product.id)) {
      this.compareProducts.push(product);
    }
  }

  clearCompare() {
    this.compareProducts.length = 0;
  }

  removeFromCompare(product: ProductSelectorResultProduct) {
    this.compareProducts = this.compareProducts
      .filter(x => x.id !== product.id);
  }
}
