import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { SIAComponent } from './sia-program/sia/sia.component';
import { VADPIntroComponent } from './sia-program/vadp/vadp-intro/vadp-intro.component';
import { ChannelPartnerComponent } from './channel-partner/channel-partner.component';
import { VADPPartnerComponent } from './vadp-partner/vadp-partner.component';
import { VadpPackageComponent } from './vadp-package/vadp-package.component';
import { VideoManagementComponent } from './video-management/video-management.component';
import { ApplicationComponent } from './application/application.component';
import { HardwareComponent } from './hardware/hardware.component';
import { SIAPartnerContentComponent } from './sia-partner-content/sia-partner-content.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { AecComponent } from './aec/aec.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PartnersRoutingModule
  ],
  declarations: [
    SIAComponent,
    VADPIntroComponent,
    ChannelPartnerComponent,
    VADPPartnerComponent,
    VadpPackageComponent,
    VideoManagementComponent,
    ApplicationComponent,
    HardwareComponent,
    SIAPartnerContentComponent,
    GuidelineComponent,
    AecComponent
  ]
})
export class PartnersModule { }
