import { Component, OnInit, Input } from '@angular/core';
import { tap, map } from 'rxjs/operators';

import { ProductSelectorSpecificationModel, ProductSelectorType } from './product-selector-specification-model';
import { VvtkApiService } from '@frontdesk/core/services';
import { ProductSelectorService } from '../../services/product-selector.service';

@Component({
  selector: 'vvtk-product-selector-specification',
  templateUrl: './product-selector-specification.component.html',
  styleUrls: ['./product-selector-specification.component.scss']
})
export class ProductSelectorSpecificationComponent implements OnInit {

  @Input() categoryId: number;
  @Input() data: ProductSelectorSpecificationModel[];

  constructor(
    private vvtkApiService: VvtkApiService,
    private productSelectorService: ProductSelectorService
  ) { }

  ngOnInit() {
    this.initData();
  }

  trackItem(index, item: ProductSelectorSpecificationModel) {
    return item ? item.id : undefined;
  }

  private initData() {
    if (this.categoryId) {
      if (this.productSelectorService.specDataMap.has(this.categoryId)) {
        this.data = this.productSelectorService.specDataMap.get(this.categoryId);
      } else {
        this.loadSpecificationSelectorOptions(this.categoryId).subscribe(
          () => {
            this.productSelectorService.specDataMap.set(this.categoryId, this.data);
          }
        );
      }
    }
  }

  private loadSpecificationSelectorOptions(categoryId: number) {
    return this.vvtkApiService.get<ProductSelectorSpecificationModel[]>({
      path: 'api/Products/Specification/Selectors',
      query: `categoryId=${categoryId}`,
      disableLanguage: true
    })
    .pipe(
      map(data => this.handleSelectorTypeYesNo(data)),
      tap(data => (this.expandedAll(data))),
      tap(data => (this.data = data))
    );
  }

  private handleSelectorTypeYesNo(data: ProductSelectorSpecificationModel[]) {
    (data || []).forEach(spec => {
      if (spec.selectorType === ProductSelectorType.YesNo) {
        spec.selectorOptions.forEach(selector => {
          selector.name = spec.name;
        });
      } else if (spec.children && spec.children.length) {
        this.handleSelectorTypeYesNo(spec.children);
      }
    });
    return data;
  }

  private expandedAll(data: ProductSelectorSpecificationModel[]) {
    (data || []).forEach(item => {
      this.updateExpansionPanel(item, true);
      this.expandedAll(item.children);
    });
  }

  updateExpansionPanel(item: ProductSelectorSpecificationModel, expanded: boolean) {
    item.isExpanded = expanded;
  }

}
