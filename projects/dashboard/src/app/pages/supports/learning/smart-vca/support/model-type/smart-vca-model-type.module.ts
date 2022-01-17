import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../../../shared-material/shared-material.module';
import { SmartVcaModelTypeRoutingModule } from './smart-vca-model-type-routing.module';
import { ModelTypeListComponent } from './model-type-list/model-type-list.component';
import { ModelTypeContentComponent } from './model-type-content/model-type-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SortablejsModule,
    SharedModule,
    SharedMaterialModule,
    SmartVcaModelTypeRoutingModule
  ],
  declarations: [
    ModelTypeListComponent,
    ModelTypeContentComponent
  ]
})
export class SmartVcaModelTypeModule { }
