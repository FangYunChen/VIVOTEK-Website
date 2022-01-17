import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { DownloadsRoutingModule } from './downloads-routing.module';
import { DownloadsComponent } from './downloads/downloads.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DownloadsRoutingModule
  ],
  declarations: [
    DownloadsComponent
  ]
})
export class DownloadsModule { }
