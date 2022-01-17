import { Injectable } from '@angular/core';
import { VvtkApiService } from '../vvtk-api.service';
import { ProductCategoryForNestedNav } from '../../../pages/products/interfaces/product-category-for-nested-nav';
import { ProductCard } from '../../../pages/products/interfaces/product-card';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(
    private vvtkApiService: VvtkApiService
  ) { }

  getProductCategories() {
    return this.vvtkApiService.get<ProductCategoryForNestedNav[]>({
      path: 'api/Product/Categories'
    });
  }

  getProductByCategory(categoryId: number) {
    return this.vvtkApiService.get<ProductCard[]>({
      path: `api/Product/Categories/${categoryId}/ProductList`,
      disableLanguage: true
    });
  }

}
