import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductSelectorRoutingModule } from './product-selector-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { ProductSelectorCategoryComponent } from './components/product-selector-category/product-selector-category.component';
import { ProductSelectorSpecificationComponent } from './components/product-selector-specification/product-selector-specification.component';
import { ProductSelectorFilterComponent } from './components/product-selector-filter/product-selector-filter.component';
import { ProductCompareManageComponent } from './components/product-compare-manage/product-compare-manage.component';
import { ProductSelectorResultComponent } from './components/product-selector-result/product-selector-result.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductSelectorRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    ProductSelectorCategoryComponent,
    ProductSelectorSpecificationComponent,
    ProductSelectorFilterComponent,
    ProductCompareManageComponent,
    ProductSelectorResultComponent,
  ]
})
export class ProductSelectorModule { }
