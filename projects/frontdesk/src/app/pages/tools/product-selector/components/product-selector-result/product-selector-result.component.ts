import { Component, OnInit } from '@angular/core';

import { ProductSelectorService } from '../../services/product-selector.service';
import { ProductSelectorResultCategory, ProductSelectorResultProduct } from './product-selector-result-model';

@Component({
  selector: 'vvtk-product-selector-result',
  templateUrl: './product-selector-result.component.html',
  styleUrls: ['./product-selector-result.component.scss']
})
export class ProductSelectorResultComponent implements OnInit {


  get categories() {
    return this.productSelectorService.products;
  }

  get hasFilteredProduct() {
    return this.categories && this.categories.some(c => c.filteredProducts && c.filteredProducts.length > 0);
  }

  constructor(
    private productSelectorService: ProductSelectorService
  ) { }

  ngOnInit() {
  }

  trackById(index, item: ProductSelectorResultCategory | ProductSelectorResultProduct) {
    return item ? item.id : undefined;
  }

  // 此段在 html 有呼叫，會影響效能，但為了讓產品狀態正確且考量維護性，暫且先這樣做。
  isInCompare(product: ProductSelectorResultProduct) {
    return this.productSelectorService.compareProducts.some(x => x.id === product.id);
  }

  addToCompare(product: ProductSelectorResultProduct) {
    this.productSelectorService.addToCompare(product);
  }

  removeFromCompare(product: ProductSelectorResultProduct) {
    this.productSelectorService.removeFromCompare(product);
  }

}
