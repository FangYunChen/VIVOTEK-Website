import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { CompatibilityProductRoutingModule } from './compatibility-product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductContentComponent } from './product-content/product-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    CompatibilityProductRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductContentComponent
  ],
})
export class CompatibilityProductModule { }
