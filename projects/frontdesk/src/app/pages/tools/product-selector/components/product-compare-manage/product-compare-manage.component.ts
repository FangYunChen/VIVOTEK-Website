import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductSelectorService } from '../../services/product-selector.service';
import { ProductSelectorResultProduct } from '../product-selector-result/product-selector-result-model';
import { I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-product-compare-manage',
  templateUrl: './product-compare-manage.component.html',
  styleUrls: ['./product-compare-manage.component.scss']
})
export class ProductCompareManageComponent implements OnInit {
  get products() {
    return this.productSelectorService.compareProducts;
  }

  constructor(
    private router: Router,
    private productSelectorService: ProductSelectorService,
    private i18nService: I18nService
  ) { }

  ngOnInit() {
  }

  goToCompare() {
    this.router.navigate([this.i18nService.getSelectedLanguageForLink(), 'tools', 'product-selector-compare'], {
      queryParams: {
        productIds: this.productSelectorService.compareProducts.map(x => x.id)
      }
    });
  }

  clearCompare() {
    this.productSelectorService.clearCompare();
  }

  removeFromCompare(product: ProductSelectorResultProduct) {
    this.productSelectorService.removeFromCompare(product);
  }

}
