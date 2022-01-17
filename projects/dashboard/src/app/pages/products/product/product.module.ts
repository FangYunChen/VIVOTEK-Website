import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { VvtkPipeModule } from '../../../shared/pipes/vvtk-pipe.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductContentComponent } from './product-content/product-content.component';
import { AvailableLangComponent } from './product-list/available-lang/available-lang.component';
import { ExportPDFComponent } from './product-list/export-pdf/export-pdf.component';
import { ProductPdfInfoComponent } from './product-pdf-info/product-pdf-info.component';
import { SortablejsModule } from 'angular-sortablejs';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    VvtkPipeModule,
    ProductRoutingModule,
    SortablejsModule
  ],
  declarations: [
    ProductListComponent,
    ProductContentComponent,
    AvailableLangComponent,
    ExportPDFComponent,
    ProductPdfInfoComponent
  ],
  entryComponents: [
    AvailableLangComponent,
    ExportPDFComponent
  ]
})
export class ProductModule { }
