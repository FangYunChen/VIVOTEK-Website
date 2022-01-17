import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationSolutionsRoutingModule } from './application-solutions-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SeeMoreComponent } from './see-more/see-more.component';
import { PeopleCountingComponent } from './people-counting/people-counting.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
// import { LPRComponent } from './lpr/lpr.component';
import { CloudBasedComponent } from './cloud-based/cloud-based.component';
import { H265Component } from './h265/h265.component';
import { CorePlusComponent } from './core-plus/core-plus.component';
import { CrowdControlSolutionContentComponent } from './crowd-control/crowd-control-content/crowd-control-content.component';
import { CrowdControlSolutionListComponent } from './crowd-control/crowd-control-list/crowd-control-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { SortablejsModule } from 'angular-sortablejs';
import { FacialRecognitionSolutionListComponent } from './facial-recognition/facial-recognition-list/facial-recognition-list.component';
import { FacialRecognitionSolutionContentComponent } from './facial-recognition/facial-recognition-content/facial-recognition-content.component';
import { SMBComponent } from './smb/smb.component';
import { EdgeComputingComponent } from './edge-computing/edge-computing.component';
import { NetworkAudioComponent } from './network-audio/network-audio.component';

@NgModule({
  imports: [
    CommonModule,
    ApplicationSolutionsRoutingModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SortablejsModule
  ],
  declarations: [
    SeeMoreComponent,
    PeopleCountingComponent,
    HeatmapComponent,
    CloudBasedComponent,
    H265Component,
    CorePlusComponent,
    CrowdControlSolutionListComponent,
    CrowdControlSolutionContentComponent,
    FacialRecognitionSolutionListComponent,
    FacialRecognitionSolutionContentComponent,
    SMBComponent,
    EdgeComputingComponent,
    NetworkAudioComponent
  ]
})
export class ApplicationSolutionsModule { }
