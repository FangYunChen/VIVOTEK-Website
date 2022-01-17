import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { ProductSpecificationRoutingModule } from './product-specification-routing.module';
import { ProductSpecificationComponent } from './product-specification.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    ProductSpecificationRoutingModule
  ],
  declarations: [
    ProductSpecificationComponent
  ]
})
export class ProductSpecificationModule { }
