import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductCard } from '../../../vvtk-core/interface/product';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';
import { DropdownListService } from '../../../vvtk-core/services/dropdown-list.service';
import { CommonSelectOption } from '../../../vvtk-core/interface/common-model';

@Component({
  selector: 'vvtk-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.scss']
})
export class ProductSelectorComponent implements OnInit {

  @Input() pageIsEditable = false;
  @Input() productCategoryOptions: CommonSelectOption[] = [];
  @Input() selectedProducts: ProductCard[] = [];
  @Input() selectProductCardText = 'Choose Product';
  @Input() multiple = true;
  @Input() needDisplaySelectedProduct = true;

  @Output() selectedProductsChange: EventEmitter<ProductCard[]> = new EventEmitter<ProductCard[]>();
  @Output() addSelect: EventEmitter<ProductCard> = new EventEmitter<ProductCard>();
  @Output() removeSelect: EventEmitter<ProductCard> = new EventEmitter<ProductCard>();

  isLoading = false;

  selectedProductCategory: number;
  products: ProductCard[] = [];
  canSelectProducts: ProductCard[] = [];

  constructor(
    private vvtkApiService: VvtkApiService,
    private dropdownListService: DropdownListService
  ) { }

  ngOnInit() {
    if (!this.productCategoryOptions || this.productCategoryOptions.length === 0) {
      this.isLoading = true;
      this.dropdownListService.getProductCategoryOptions().pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        options => this.productCategoryOptions = options
      );
    }
  }

  productCategoryChange(categoryId) {
    this.isLoading = true;
    this.vvtkApiService.get<ProductCard[]>({
      path: `api/Products/Category/${categoryId}/Products`,
      disableLanguage: true
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      data => {
        this.products = data;
        this.filterAvailableProduct();
      }
    );
  }

  filterAvailableProduct() {
    this.canSelectProducts = this.products.filter(product =>
      this.selectedProducts.filter(selectedProduct => product.id === selectedProduct.id).length === 0);
  }

  addProduct(product: ProductCard) {
    if (!this.multiple) {
      this.selectedProducts.splice(0, this.selectedProducts.length);
    }
    this.selectedProducts.push(product);
    this.filterAvailableProduct();
    this.addSelect.emit(product);
  }

  removeProduct(product: ProductCard) {
    this.selectedProducts = this.selectedProducts.filter(x => x.id !== product.id);
    this.selectedProductsChange.emit(this.selectedProducts);
    this.filterAvailableProduct();
    this.removeSelect.emit(product);
  }

}
