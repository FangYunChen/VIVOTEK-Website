import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ProductMainInfoComponent } from './product-main-info/product-main-info.component';
import { NormalProductComponent } from './normal-product/normal-product.component';
import { SwitchTabProductComponent } from './switch-tab-product/switch-tab-product.component';
import { TopBannerForProductPageComponent } from './top-banner-for-product-page/top-banner-for-product-page.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    ProductMainInfoComponent,
    NormalProductComponent,
    SwitchTabProductComponent,
    TopBannerForProductPageComponent
  ]
})
export class ProductModule { }
