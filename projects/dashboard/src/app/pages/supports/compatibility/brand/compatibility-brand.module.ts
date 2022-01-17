import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { CompatibilityBrandRoutingModule } from './compatibility-brand-routing.module';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandContentComponent } from './brand-content/brand-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    CompatibilityBrandRoutingModule
  ],
  declarations: [
    BrandListComponent,
    BrandContentComponent
  ],
})
export class CompatibilityBrandModule { }
