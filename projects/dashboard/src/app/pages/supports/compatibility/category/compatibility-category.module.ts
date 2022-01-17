import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { CompatibilityCategoryRoutingModule } from './compatibility-category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryContentComponent } from './category-content/category-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SortablejsModule,
    SharedModule,
    SharedMaterialModule,
    CompatibilityCategoryRoutingModule
  ],
  declarations: [
    CategoryListComponent,
    CategoryContentComponent
  ],
})
export class CompatibilityCategoryModule { }
