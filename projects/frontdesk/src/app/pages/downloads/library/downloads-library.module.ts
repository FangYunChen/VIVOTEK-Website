import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { GeneralDownloadModule } from '../general-download/general-download.module';
import { DownloadsLibraryRoutingModule } from './downloads-library-routing.module';
import { VideoComponent } from './video/video.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { WebinarComponent } from './webinar/webinar.component';
import { WhitePaperComponent } from './white-paper/white-paper.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralDownloadModule,
    DownloadsLibraryRoutingModule
  ],
  declarations: [
    VideoComponent,
    TutorialsComponent,
    WebinarComponent,
    WhitePaperComponent
  ]
})
export class DownloadsLibraryModule { }
