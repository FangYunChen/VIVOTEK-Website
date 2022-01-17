import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SIAComponent } from './sia-program/sia/sia.component';
import { VADPIntroComponent } from './sia-program/vadp/vadp-intro/vadp-intro.component';
import { VADPPartnerComponent } from './vadp-partner/vadp-partner.component';
import { VadpPackageComponent } from './vadp-package/vadp-package.component';
import { ChannelPartnerComponent } from './channel-partner/channel-partner.component';
import { VideoManagementComponent } from './video-management/video-management.component';
import { ApplicationComponent } from './application/application.component';
import { HardwareComponent } from './hardware/hardware.component';
import { SIAPartnerContentComponent } from './sia-partner-content/sia-partner-content.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { AecComponent } from './aec/aec.component';

const routes: Routes = [
  {
    path: 'sia',
    component: SIAComponent
  },
  {
    path: 'vadp',
    component: VADPIntroComponent
  },
  {
    path: 'vadp-partner',
    component: VADPPartnerComponent
  },
  {
    path: 'vadp-package',
    component: VadpPackageComponent
  },
  {
    path: 'video-management-partner',
    component: VideoManagementComponent
  },
  {
    path: 'video-management-partner/:id',
    component: SIAPartnerContentComponent
  },
  {
    path: 'video-management-partner/:id/:title',
    component: SIAPartnerContentComponent
  },
  {
    path: 'application-partner',
    component: ApplicationComponent
  },
  {
    path: 'application-partner/:id',
    component: SIAPartnerContentComponent
  },
  {
    path: 'application-partner/:id/:title',
    component: SIAPartnerContentComponent
  },
  {
    path: 'hardware-partner',
    component: HardwareComponent
  },
  {
    path: 'hardware-partner/:id',
    component: SIAPartnerContentComponent
  },
  {
    path: 'hardware-partner/:id/:title',
    component: SIAPartnerContentComponent
  },
  {
    path: 'channel-partner',
    component: ChannelPartnerComponent
  },
  {
    path: 'guideline',
    component: GuidelineComponent
  },
  {
    path: 'aec',
    component: AecComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
