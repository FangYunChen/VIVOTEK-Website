import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { GeneralDownloadModule } from '../general-download/general-download.module';
import { DownloadsCountingCamaraRoutingModule } from './downloads-counting-camara-firmware-routing.module';
import { CountingCamaraComponent } from './component/counting-camara-firmware.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralDownloadModule,
    DownloadsCountingCamaraRoutingModule
  ],
  declarations: [
    CountingCamaraComponent
  ]
})
export class DownloadsCountingCamaraModule { }
