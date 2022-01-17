import { FacialRecognitionSolutionContentComponent } from './facial-recognition/facial-recognition-content/facial-recognition-content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeeMoreComponent } from './see-more/see-more.component';
import { PeopleCountingComponent } from './people-counting/people-counting.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { CloudBasedComponent } from './cloud-based/cloud-based.component';
import { H265Component } from './h265/h265.component';
import { CorePlusComponent } from './core-plus/core-plus.component';
import { CrowdControlSolutionListComponent } from './crowd-control/crowd-control-list/crowd-control-list.component';
import { CrowdControlSolutionContentComponent } from './crowd-control/crowd-control-content/crowd-control-content.component';
import { FacialRecognitionSolutionListComponent } from './facial-recognition/facial-recognition-list/facial-recognition-list.component';
import { SMBComponent } from './smb/smb.component';
import { EdgeComputingComponent } from './edge-computing/edge-computing.component';
import { NetworkAudioComponent } from './network-audio/network-audio.component';

const routes: Routes = [
  {
    path: 'see-more',
    component: SeeMoreComponent
  },
  {
    path: 'people-counting',
    component: PeopleCountingComponent
  },
  {
    path: 'heatmap',
    component: HeatmapComponent
  },
  {
    path: 'lpr',
    loadChildren: './lpr/lpr.module#LprModule'
  },
  {
    path: 'cloud-based',
    component: CloudBasedComponent
  },
  {
    path: 'h265',
    component: H265Component
  },
  {
    path: 'wide-coverage',
    loadChildren: './wide-coverage/wide-coverage.module#WideCoverageModule'
  },
  {
    path: 'core-plus',
    component: CorePlusComponent
  },
  {
    path: 'crowd-control-solution',
    component: CrowdControlSolutionListComponent
  },
  {
    path: 'crowd-control-solution/:id',
    component: CrowdControlSolutionContentComponent
  },
  {
    path: 'facial-recognition-solution',
    component: FacialRecognitionSolutionListComponent
  },
  {
    path: 'facial-recognition-solution/:id',
    component: FacialRecognitionSolutionContentComponent
  },
  {
    path: 'smb',
    component: SMBComponent
  },
  {
    path: 'edge-computing',
    component: EdgeComputingComponent
  },
  {
    path: 'network-audio',
    component: NetworkAudioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationSolutionsRoutingModule { }
