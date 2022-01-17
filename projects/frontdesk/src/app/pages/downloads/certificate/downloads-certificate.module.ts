import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { GeneralDownloadModule } from '../general-download/general-download.module';
import { DownloadsCertificateRoutingModule } from './downloads-certificate-routing.module';
import { CertificateComponent } from './component/certificate.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralDownloadModule,
    DownloadsCertificateRoutingModule
  ],
  declarations: [
    CertificateComponent
  ]
})
export class DownloadsCertificateModule { }
