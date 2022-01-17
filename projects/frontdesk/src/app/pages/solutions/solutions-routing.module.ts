import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { MultiSensorComponent } from './application-solutions/multi-sensor/multi-sensor.component';
import { Solutions180Component } from './application-solutions/solutions-180/solutions-180.component';
import { Solutions360Component } from './application-solutions/solutions-360/solutions-360.component';
import { CorePlusComponent } from './application-solutions/core-plus/core-plus.component';
import { FactorySecurityComponent } from './vertical-solutions/factory-security/factory-security.component';
import { ProductivityAndSafetyComponent } from './vertical-solutions/productivity-and-safety/productivity-and-safety.component';
import { CrowdControlComponent } from './application-solutions/crowd-control/crowd-control.component';
import { FacialRecognitionComponent } from './application-solutions/facial-recognition/facial-recognition.component';
import { SolutionsSMBComponent } from './application-solutions/smb/smb.component';
import { MultiSiteManagementComponent } from './vertical-solutions/multi-site-management/multi-site-management.component';
import { EdgeComputingComponent } from './application-solutions/edge-computing/edge-computing.component';
import { NetworkAudioComponent } from './application-solutions/network-audio/network-audio.component';

const routes: Routes = [
  {
    path: 'people-counting',
    component: PeopleCountingComponent
  },
  {
    path: 'lpr',
    component: LPRComponent
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
    path: 'retail',
    component: RetailComponent
  },
  {
    path: 'security',
    component: SecurityComponent
  },
  {
    path: 'business-intelligence',
    component: BusinessIntelligenceComponent
  },
  {
    path: 'transportation',
    component: TransportationComponent
  },
  {
    path: 'wide-coverage',
    component: WideCoverageComponent
  },
  {
    path: 'stop-and-go',
    component: StopAndGoComponent
  },
  {
    path: 'high-speed',
    component: HighSPeedComponent
  },
  {
    path: 'partners',
    component: PartnersComponent
  },
  {
    path: '180',
    component: Solutions180Component
  },
  {
    path: '360',
    component: Solutions360Component
  },
  {
    path: 'multi-sensor',
    component: MultiSensorComponent
  },
  {
    path: 'core-plus',
    component: CorePlusComponent
  },
  {
    path: 'factory-security',
    component: FactorySecurityComponent
  },
  {
    path: 'productivity-and-safety',
    component: ProductivityAndSafetyComponent
  },
  {
    path: 'crowd-control-solution',
    component: CrowdControlComponent
  },
  {
    path: 'facial-recognition',
    component: FacialRecognitionComponent
  },
  {
    path: 'smb',
    component: SolutionsSMBComponent
  },
  {
    path: 'multi-site_management',
    component: MultiSiteManagementComponent
  },
  {
    path: 'edge-computing-covid-19-defender',
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
export class SolutionsRoutingModule { }
