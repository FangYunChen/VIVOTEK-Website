import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { CompatibilityModelRoutingModule } from './compatibility-model-routing.module';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelContentComponent } from './model-content/model-content.component';
import { DropdownListService } from '../services/dropdown-list.service';
import { ModelProductContentComponent } from './model-content/model-product-content/model-product-content.component';
import { ModelCategoryContentComponent } from './model-content/model-category-content/model-category-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    CompatibilityModelRoutingModule
  ],
  declarations: [
    ModelListComponent,
    ModelContentComponent,
    ModelProductContentComponent,
    ModelCategoryContentComponent,
  ],
  providers: [DropdownListService]
})
export class CompatibilityModelModule { }
