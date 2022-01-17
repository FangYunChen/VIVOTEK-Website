import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SortablejsModule } from 'angular-sortablejs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryMenuComponent } from './tree/category-menu/category-menu.component';
import { CategoryEditorComponent } from './tree/category-editor/category-editor.component';
import { ProductSelectorSettingComponent } from './product-selector-setting/product-selector-setting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    CategoryRoutingModule
  ],
  declarations: [
    CategoryMenuComponent,
    CategoryEditorComponent,
    ProductSelectorSettingComponent
  ]
})
export class CategoryModule { }
