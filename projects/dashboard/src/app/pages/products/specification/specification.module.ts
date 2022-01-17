import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SortablejsModule } from 'angular-sortablejs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { SpecificationRoutingModule } from './specification-routing.module';
import { SpecificationMenuComponent } from './tree/specification-menu/specification-menu.component';
import { SpecificationEditorComponent } from './tree/specification-editor/specification-editor.component';
import { DisplaySettingComponent } from './display-setting/display-setting.component';
import { DisplayOrderComponent } from './display-order/display-order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    SpecificationRoutingModule
  ],
  declarations: [
    SpecificationMenuComponent,
    SpecificationEditorComponent,
    DisplaySettingComponent,
    DisplayOrderComponent
  ]
})
export class SpecificationModule { }
