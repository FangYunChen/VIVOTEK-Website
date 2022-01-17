import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { GeneralDownloadModule } from '../general-download/general-download.module';
import { DownloadsProductRoutingModule } from './downloads-product-routing.module';
import { ProductComponent } from './components/product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    GeneralDownloadModule,
    DownloadsProductRoutingModule
  ],
  declarations: [
    ProductComponent
  ]
})
export class DownloadsProductModule { }
