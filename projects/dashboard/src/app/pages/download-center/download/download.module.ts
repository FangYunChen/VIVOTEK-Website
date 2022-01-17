import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DownloadRoutingModule } from './download-routing.module';
import { DownloadListComponent } from './download-list/download-list.component';
import { DownloadContentComponent } from './download-content/download-content.component';
import { DownloadDropdownListService } from '../services/download-dropdown-list.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    NgxMatSelectSearchModule,
    DownloadRoutingModule
  ],
  declarations: [
    DownloadListComponent,
    DownloadContentComponent,
  ],
  providers: [DownloadDropdownListService]
})
export class DownloadModule { }
