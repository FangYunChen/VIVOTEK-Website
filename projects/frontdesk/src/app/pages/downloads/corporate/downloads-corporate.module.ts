import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { GeneralDownloadModule } from '../general-download/general-download.module';
import { DownloadsCorporateRoutingModule } from './downloads-corporate-routing.module';
import { LogoComponent } from './logo/logo.component';
import { WallPaperComponent } from './wall-paper/wall-paper.component';
import { CisComponent } from './cis/cis.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralDownloadModule,
    DownloadsCorporateRoutingModule
  ],
  declarations: [
    LogoComponent,
    WallPaperComponent,
    CisComponent
  ]
})
export class DownloadsCorporateModule { }
