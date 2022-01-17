import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DownloadCenterRoutingModule } from './download-center-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DownloadCenterRoutingModule
  ],
  declarations: []
})
export class DownloadCenterModule { }
