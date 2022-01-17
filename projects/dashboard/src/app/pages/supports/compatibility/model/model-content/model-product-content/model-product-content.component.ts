import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SupportModelProduct, SupportModelCategory } from '../../../../../../vvtk-core/interface/support-compatibility';
import { CommonSelectOption } from '../../../../../../vvtk-core/interface/common-model';
import { ToolsService } from '../../../../../../vvtk-core/services/tools.service';
import { DropdownListService } from '../../../services/dropdown-list.service';

@Component({
  selector: 'vvtk-model-product-content',
  templateUrl: './model-product-content.component.html',
  styleUrls: ['./model-product-content.component.scss']
})
export class ModelProductContentComponent implements OnInit, OnChanges {

  @Input() pageIsEditable = false;
  @Input() product: SupportModelProduct;
  @Input() selectedProductIds: Set<number> = new Set<number>();
  @Input() productOptions: CommonSelectOption[] = [];
  @Input() productIndex: number;
  @Output() productAdded: EventEmitter<any> = new EventEmitter();
  @Output() productRemoved: EventEmitter<any> = new EventEmitter();
  @Output() productSelected: EventEmitter<any> = new EventEmitter();

  canSelectProductOptions: CommonSelectOption[] = [];
  selectedCategoryIds: Set<number> = new Set<number>();
  categoryOptions: CommonSelectOption[] = [];

  get isAddProduct(): boolean {
    return this.product.id === 0;
  }

  constructor(
    private toolsService: ToolsService,
    private dropdownListService: DropdownListService
  ) { }

  ngOnInit() {
    if (!this.isAddProduct) {
      this.setCategoryOptions();
      this.setSelectedCategoryIds();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterProductOptions();
  }

  filterProductOptions() {
    this.canSelectProductOptions = this.productOptions.filter(
      option => !this.selectedProductIds.has(<number>option.value)
        || this.product.id === option.value
    );
  }

  selectProduct() {
    this.product.categories = [];
    this.setCategoryOptions();
    this.productSelected.emit();
  }

  setCategoryOptions() {
    this.dropdownListService.getCategoryOptions(this.product.id).subscribe(
      options => this.categoryOptions = options
    );
  }

  setSelectedCategoryIds() {
    const selectedCategoryIds = this.product.categories.map(x => x.id);
    this.selectedCategoryIds = new Set(selectedCategoryIds);
  }

  trackCategory(index, category) {
    return category ? category.id : undefined;
  }

  addCategory(idx: number) {
    this.toolsService.lockScrollTop();
    const clone: SupportModelCategory[] = this.toolsService.copyObject(this.product.categories);
    clone.splice(idx, 0, {
      id: 0,
      features: []
    });
    this.product.categories = clone;
    this.setSelectedCategoryIds();
  }

  deleteCategory(idx: number) {
    this.product.categories.splice(idx, 1);
    this.setSelectedCategoryIds();
  }

}
