import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  Product,
  Category,
  Feature,
  Model
} from '@frontdesk/core/interfaces/compatibility';

@Injectable({
  providedIn: 'root'
})
export class CompatibilityListService {
  constructor(private vvtkService: VvtkService, private httpClient: HttpClient) {}
  private _productList = new Subject<Product[]>();
  private _categoryList = new Subject<Category[]>();
  private _featureList = new Subject<Feature[]>();
  private _modelList = new Subject<Model[]>();
  get productList$() {
    return this._productList.asObservable();
  }
  get categoryList$() {
    return this._categoryList.asObservable();
  }
  get featureList$() {
    return this._featureList.asObservable();
  }
  get modelList$() {
    return this._modelList.asObservable();
  }
  getProducts() {
    return this.vvtkService.get(
      {
        path: `api/supportcl/productlist`,
        disableLanguage: true
      },
      {
        next: resp => this._productList.next(resp.json())
      }
    );
  }
  getCategories(productId) {
    return this.vvtkService.get(
      {
        path: `api/supportcl/products/${productId}/categoryList`,
        disableLanguage: true
      },
      {
        next: resp => this._categoryList.next(resp.json())
      }
    );
  }
  getFeatures(productId, categoryId) {
    return this.vvtkService.get(
      {
        path: `api/supportcl/Products/${productId}/Categories/${categoryId}/CompatibilityListFeatures`,
        disableLanguage: true
      },
      {
        next: resp => this._featureList.next(resp.json())
      }
    );
  }
  getModels(productId, categoryId) {
    return this.vvtkService.get(
      {
        path: `api/supportcl/Products/${productId}/Categories/${categoryId}/CompatibilityListModels`,
        disableLanguage: true
      },
      {
        next: resp => this._modelList.next(resp.json())
      }
    );
  }
}
