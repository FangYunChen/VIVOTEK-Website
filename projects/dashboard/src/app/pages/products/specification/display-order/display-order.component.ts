import { Component, OnInit } from '@angular/core';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { DropdownListService } from 'projects/dashboard/src/app/vvtk-core/services/dropdown-list.service';
import { CommonSelectOption } from 'projects/dashboard/src/app/vvtk-core/interface/common-model';
import { ProductSpecificationDisplayOrder } from 'projects/dashboard/src/app/vvtk-core/interface/product-specification';
import { finalize } from 'rxjs/operators';
import { ProductSpecificaionPurposeTypeList } from 'projects/dashboard/src/app/vvtk-core/constants/product-specification-constant';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'vvtk-display-order',
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.scss']
})
export class DisplayOrderComponent implements OnInit {

  get pageIsEditable() {
    return this.sharedService.pageIsEditable;
  }

  isLoading;
  productCategoryId: number;
  productCategoryOptions: CommonSelectOption[] = [];

  purposeType: number;
  purposeTypeOptions: CommonSelectOption[] = ProductSpecificaionPurposeTypeList;

  specificationDisplayOrders: ProductSpecificationDisplayOrder[] = [];

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  constructor(
    private sharedService: SharedService,
    private vvtkApiService: VvtkApiService,
    private dropdownListService: DropdownListService
  ) { }

  ngOnInit() {
    this.dropdownListService.getProductCategoryOptions().subscribe(
      categories => this.productCategoryOptions = categories
    );
  }

  getData() {
    if (this.productCategoryId && this.purposeType) {
      this.isLoading = true;
      this.vvtkApiService.get<ProductSpecificationDisplayOrder[]>({
        path: `api/Product/Specification`,
        query: { categoryId: this.productCategoryId, purposeType: this.purposeType }
      }).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(x => this.specificationDisplayOrders = x);
    }
  }

  save() {
    this.isLoading = true;
    this.vvtkApiService.patch({
      path: `api/Product/Specification/ChangeDisplayOrder`,
      disableLanguage: true,
      query: { categoryId: this.productCategoryId, purposeType: this.purposeType }
    }, this.postData).pipe(
      finalize(() => this.isLoading = false),
    ).subscribe();
  }

  private get postData() {
    return this.mapPostDataToArray(this.specificationDisplayOrders).map(x => ({
      specId: x.id,
      purposeType: this.purposeType,
      displayOrder: x.displayOrder
    }));
  }

  private mapPostDataToArray(specificationDisplayOrders: ProductSpecificationDisplayOrder[]): ProductSpecificationDisplayOrder[] {
    if (specificationDisplayOrders) {
      let result: ProductSpecificationDisplayOrder[] = [];
      specificationDisplayOrders.forEach((specificationDisplayOrder, index) => {
        specificationDisplayOrder.displayOrder = index + 1;
        result.push(specificationDisplayOrder);
        if (specificationDisplayOrder.children && specificationDisplayOrder.children.length > 0) {
          const children = this.mapPostDataToArray(specificationDisplayOrder.children);
          result = [...result, ...children];
        }
      });
      return result;
    }
  }
}
