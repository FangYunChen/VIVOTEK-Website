import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { VvtkPipeModule } from '../../../shared/pipes/vvtk-pipe.module';
import { DatasheetRoutingModule } from './datasheet-routing.module';
import { DatasheetListComponent } from './datasheet-list/datasheet-list.component';
import { DatasheetContentComponent } from './datasheet-content/datasheet-content.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    NgxMatSelectSearchModule,
    VvtkPipeModule,
    DatasheetRoutingModule
  ],
  declarations: [
    DatasheetListComponent,
    DatasheetContentComponent
  ]
})
export class DatasheetModule { }
