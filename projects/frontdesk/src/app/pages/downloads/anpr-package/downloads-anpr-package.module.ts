import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { GeneralDownloadModule } from '../general-download/general-download.module';
import { AnprComponent } from './component/anpr-package.component';
import { DownloadsAnprRoutingModule } from './downloads-anpr-package-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralDownloadModule,
    DownloadsAnprRoutingModule
  ],
  declarations: [
    AnprComponent
  ]
})
export class DownloadsAnprModule { }
