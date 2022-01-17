import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../../../shared-material/shared-material.module';
import { ModelTypeRoutingModule } from './model-type-routing.module';
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
    ModelTypeRoutingModule
  ],
  declarations: [
    ModelTypeListComponent,
    ModelTypeContentComponent
  ]
})
export class ModelTypeModule { }
