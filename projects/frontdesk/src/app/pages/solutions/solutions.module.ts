import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolutionsRoutingModule } from './solutions-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PeopleCountingComponent } from './application-solutions/people-counting/people-counting.component';
// import { HeatmapComponent } from './application-solutions/heatmap/heatmap.component';
import { LPRComponent } from './application-solutions/lpr/lpr.component';
import { CloudBasedComponent } from './application-solutions/cloud-based/cloud-based.component';
import { H265Component } from './application-solutions/h265/h265.component';
import { RetailComponent } from './vertical-solutions/retail/retail.component';
import { TransportationComponent } from './vertical-solutions/transportation/transportation.component';
import { WideCoverageComponent } from './application-solutions/wide-coverage/wide-coverage.component';
import { SecurityComponent } from './vertical-solutions/security/security.component';
import { BusinessIntelligenceComponent } from './vertical-solutions/business-intelligence/business-intelligence.component';
import { StopAndGoComponent } from './application-solutions/stop-and-go/stop-and-go.component';
import { HighSPeedComponent } from './application-solutions/high-speed/high-speed.component';
import { PartnersComponent } from './application-solutions/partners/partners.component';
import { Solutions180Component } from './application-solutions/solutions-180/solutions-180.component';
import { Solutions360Component } from './application-solutions/solutions-360/solutions-360.component';
import { MultiSensorComponent } from './application-solutions/multi-sensor/multi-sensor.component';
import { CorePlusComponent } from './application-solutions/core-plus/core-plus.component';
import { ProductivityAndSafetyComponent } from './vertical-solutions/productivity-and-safety/productivity-and-safety.component';
import { FactorySecurityComponent } from './vertical-solutions/factory-security/factory-security.component';
import { CrowdControlComponent } from './application-solutions/crowd-control/crowd-control.component';
import { FacialRecognitionComponent } from './application-solutions/facial-recognition/facial-recognition.component';
import { SolutionsSMBComponent } from './application-solutions/smb/smb.component';
import { MultiSiteManagementComponent } from './vertical-solutions/multi-site-management/multi-site-management.component';
import { EdgeComputingComponent } from './application-solutions/edge-computing/edge-computing.component';
import { NetworkAudioComponent } from './application-solutions/network-audio/network-audio.component';

@NgModule({
  imports: [
    CommonModule,
    SolutionsRoutingModule,
    SharedModule
  ],
  declarations: [
    PeopleCountingComponent,
    LPRComponent,
    CloudBasedComponent,
    H265Component,
    RetailComponent,
    TransportationComponent,
    WideCoverageComponent,
    SecurityComponent,
    BusinessIntelligenceComponent,
    StopAndGoComponent,
    HighSPeedComponent,
    PartnersComponent,
    Solutions180Component,
    Solutions360Component,
    MultiSensorComponent,
    CorePlusComponent,
    FactorySecurityComponent,
    ProductivityAndSafetyComponent,
    CrowdControlComponent,
    FacialRecognitionComponent,
    SolutionsSMBComponent,
    MultiSiteManagementComponent,
    EdgeComputingComponent,
    NetworkAudioComponent
  ]
})
export class SolutionsModule { }
