import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';
import { SupportProduct, SupportCategory } from '../../../../../vvtk-core/interface/support-compatibility';
import { CommonSelectOption } from '../../../../../vvtk-core/interface/common-model';
import { map, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'vvtk-product-content',
  templateUrl: './product-content.component.html'
})
export class ProductContentComponent implements OnInit {

  pageIsEditable: boolean;

  id = 0;
  product: SupportProduct;
  categoryOptions: CommonSelectOption[] = [];

  isLoading = false;

  get isAddData() {
    return this.id === 0;
  }

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.product = {
      name: '',
      categories: [],
      categoryIds: []
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getSupportCategories();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (!this.isAddData) {
        this.getSupportProduct();
      }
    });
  }

  getSupportCategories() {
    this.vvtkApiService.get<SupportCategory[]>({
      path: `api/SupportCL/Categories`,
      disableLanguage: true
    }).pipe(map(categories => {
      return categories.map(category => <CommonSelectOption>{
        optionText: category.name,
        value: category.id
      });
    })).subscribe(
      categories => this.categoryOptions = categories
    );
  }

  getSupportProduct() {
    this.isLoading = true;
    this.vvtkApiService.get<SupportProduct>({
      path: `api/SupportCL/Products/${this.id}`,
      disableLanguage: true
    }).pipe(
      tap(
        product =>
          product.categoryIds = product.categories.map(category => category.id)
      ),
      finalize(() => this.isLoading = false)
    ).subscribe(
      product => this.product = product
    );
  }

  save() {
    this.isLoading = true;
    this.product.categories = this.product.categoryIds.map(
      id => ({ id: id })
    );
    if (this.isAddData) {
      this.vvtkApiService.post({
        path: `api/SupportCL/Products`,
        disableLanguage: true
      }, this.product).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        _ => this.router.navigate(['/supports/compatibility/product'])
      );
    } else {
      this.vvtkApiService.patch({
        path: `api/SupportCL/Products/${this.id}`,
        disableLanguage: true
      }, this.product).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        _ => this.router.navigate(['/supports/compatibility/product'])
      );
    }
  }

}
