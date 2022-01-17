import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { WebinarComponent } from './webinar/webinar.component';
import { WhitePaperComponent } from './white-paper/white-paper.component';

const routes: Routes = [
  {
    path: 'video',
    component: VideoComponent
  },
  {
    path: 'tutorials',
    component: TutorialsComponent
  },
  {
    path: 'webinar',
    component: WebinarComponent
  },
  {
    path: 'white-paper',
    component: WhitePaperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadsLibraryRoutingModule { }
