import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSelectorCompareRoutingModule } from './product-selector-compare-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { NestedSpecificationCompareComponent } from './components/nested-specification-compare/nested-specification-compare.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';

@NgModule({
  imports: [
    CommonModule,
    ProductSelectorCompareRoutingModule,
    SharedModule
  ],
  declarations: [HomeComponent, NestedSpecificationCompareComponent, ProductInfoComponent]
})
export class ProductSelectorCompareModule { }
