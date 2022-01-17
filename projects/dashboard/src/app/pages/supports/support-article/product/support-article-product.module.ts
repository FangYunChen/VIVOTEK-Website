import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { SupportArticleProductRoutingModule } from './support-article-product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductContentComponent } from './product-content/product-content.component';
import { SortablejsModule } from 'angular-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    SupportArticleProductRoutingModule,
    SortablejsModule
  ],
  declarations: [
    ProductListComponent,
    ProductContentComponent
  ],
})
export class SupportArticleProductModule { }
