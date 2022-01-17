import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { ProductSelectorFilterModel } from './product-selector-filter-model';
import {
  ProductSelectorType,
  ProductSelectorSpecificationModel
} from '../product-selector-specification/product-selector-specification-model';
import { ProductSelectorService } from '../../services/product-selector.service';

@Component({
  selector: 'vvtk-product-selector-filter',
  templateUrl: './product-selector-filter.component.html',
  styleUrls: ['./product-selector-filter.component.scss']
})
export class ProductSelectorFilterComponent implements OnInit {

  @Input() specItem: ProductSelectorSpecificationModel;
  @Input()
  set data(value: ProductSelectorFilterModel[]) {
    this._data = value;
    this.initModel(this.data);
  }
  get data() {
    return this._data;
  }

  private _data: ProductSelectorFilterModel[];

  @HostBinding('class.filter-type-boolean')
  get filterTypeBoolean() {
    return this.specItem.selectorType === ProductSelectorType.YesNo;
  }

  constructor(
    private productSelectorService: ProductSelectorService
  ) {}

  ngOnInit() {
  }

  trackItem(index, item: ProductSelectorFilterModel) {
    return item ? item.id : undefined;
  }

  private initModel(data: ProductSelectorFilterModel[]) {
    (data || []).forEach(item => {
      if (item.isFilter && !item.model) {
        item.model = {};
        if (this.specItem.selectorType === ProductSelectorType.Range) {
          item.model.rangeMinValue = item.minimum;
          item.model.rangeMaxValue = item.maximum;
        }
      }
    });
  }

  selectorChanged(item: ProductSelectorFilterModel) {
    this.productSelectorService.updateSelector(this.specItem, item);
  }

  radioButtonClicked(item: ProductSelectorFilterModel, $event: MouseEvent) {
    this.productSelectorService.updateSelector(this.specItem, item);
    $event.preventDefault();
    $event.stopPropagation();
  }

}
