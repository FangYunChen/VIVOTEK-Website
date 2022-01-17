import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SIAProgramRoutingModule } from './sia-program-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SIAComponent } from './sia/sia.component';
import { VideoManagementComponent } from './video-management/video-management.component';
import { ApplicationComponent } from './application/application.component';
import { HardwareComponent } from './hardware/hardware.component';

@NgModule({
  imports: [
    CommonModule,
    SIAProgramRoutingModule,
    SharedModule
  ],
  declarations: [
    SIAComponent,
    VideoManagementComponent,
    ApplicationComponent,
    HardwareComponent
  ]
})
export class SIAProgramModule { }
