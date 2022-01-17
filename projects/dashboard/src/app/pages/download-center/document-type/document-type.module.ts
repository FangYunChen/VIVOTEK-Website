import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'angular-sortablejs';

import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { DocumentTypeRoutingModule } from './document-type-routing.module';

import { PropertyComponent } from './property/property.component';
import { DownloadDropdownListService } from '../services/download-dropdown-list.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SortablejsModule,
    SharedModule,
    SharedMaterialModule,
    DocumentTypeRoutingModule,
  ],
  declarations: [
    PropertyComponent
  ],
  providers: [DownloadDropdownListService],
})
export class DocumentTypeModule { }
