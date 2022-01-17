import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { GeneralDownloadModule } from '../general-download/general-download.module';
import { DownloadsSdkRoutingModule } from './downloads-sdk-routing.module';
import { SdkComponent } from './component/sdk.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralDownloadModule,
    DownloadsSdkRoutingModule
  ],
  declarations: [
    SdkComponent
  ]
})
export class DownloadsSdkModule { }
