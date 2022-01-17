import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DownloadCertificateRoutingModule } from './download-certificate-routing.module';
import { DownloadCertificateListComponent } from './download-certificate-list/download-certificate-list.component';
import { DownloadCertificateContentComponent } from './download-certificate-content/download-certificate-content.component';
import { DownloadDropdownListService } from '../services/download-dropdown-list.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    NgxMatSelectSearchModule,
    DownloadCertificateRoutingModule
  ],
  declarations: [
    DownloadCertificateListComponent,
    DownloadCertificateContentComponent,
  ],
  providers: [DownloadDropdownListService]
})
export class DownloadCertificateModule { }
