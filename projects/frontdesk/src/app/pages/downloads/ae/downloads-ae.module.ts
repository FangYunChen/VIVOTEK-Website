import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { GeneralDownloadModule } from '../general-download/general-download.module';
import { AEComponent } from './component/ae.component';
import { DownloadsAERoutingModule } from './downloads-ae-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralDownloadModule,
    DownloadsAERoutingModule
  ],
  declarations: [
    AEComponent
  ]
})
export class DownloadsAEModule { }
