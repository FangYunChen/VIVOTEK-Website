import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  imports: [
    CommonModule,
    ProductListRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    CategoryListComponent
  ]
})
export class ProductListModule { }
