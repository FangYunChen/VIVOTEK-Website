import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { TabRoutingModule } from './tab-routing.module';
import { TabListComponent } from './tab-list/tab-list.component';
import { TabContentComponent } from './tab-content/tab-content.component';
import { TemplatesComponent } from '../../../../shared/components/templates/templates.component';
import { KeyFeatureComponent } from './tab-content/key-feature/key-feature.component';
import { RelatedProductComponent } from './tab-content/related-product/related-product.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    SortablejsModule,
    SharedModule,
    SharedMaterialModule,
    TabRoutingModule
  ],
  declarations: [
    TabListComponent,
    TabContentComponent,
    KeyFeatureComponent,
    RelatedProductComponent,
  ],
  entryComponents: [
    TemplatesComponent,
    KeyFeatureComponent,
    RelatedProductComponent,
  ]
})
export class TabModule { }
