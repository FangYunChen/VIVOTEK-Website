import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { VMSintegrationComponent } from './vms-integration/vms-integration.component';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule, SharedModule,
    FormsModule
  ],
  declarations: [
    VMSintegrationComponent]
})
export class ProductsModule { }
