import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { SupportBrand, SupportProduct, SupportCategory } from '../../../../vvtk-core/interface/support-compatibility';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';

@Injectable()
export class DropdownListService {

  constructor(private vvtkApiService: VvtkApiService) { }

  getProductOptions() {
    return this.vvtkApiService.get<SupportProduct[]>({
      path: `api/SupportCL/ProductList`,
      disableLanguage: true
    }).pipe(
      map(products => {
        return products.map(product => <CommonSelectOption>{
          optionText: product.name,
          value: product.id
        });
      })
    );
  }

  getCategoryOptions(productId: number) {
    return this.vvtkApiService.get<SupportCategory[]>({
      path: `api/SupportCL/Products/${productId}/CategoryList`,
      disableLanguage: true
    }).pipe(
      map(categories => {
        return categories.map(category => <CommonSelectOption>{
          optionText: category.name,
          value: category.id
        });
      })
    );
  }

  getBrandOptions() {
    return this.vvtkApiService.get<SupportBrand[]>({
      path: `api/SupportCL/BrandList`,
      disableLanguage: true
    }).pipe(
      map(brands => {
        return brands.map(brand => <CommonSelectOption>{
          optionText: brand.name,
          value: brand.id
        });
      })
    );
  }

}
