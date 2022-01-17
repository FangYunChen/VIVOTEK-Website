import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SIAComponent } from './sia/sia.component';
import { VideoManagementComponent } from './video-management/video-management.component';
import { ApplicationComponent } from './application/application.component';
import { HardwareComponent } from './hardware/hardware.component';

const routes: Routes = [
  {
    path: 'sia',
    component: SIAComponent
  },
  {
    path: 'video-management',
    component: VideoManagementComponent
  },
  {
    path: 'application',
    component: ApplicationComponent
  },
  {
    path: 'hardware',
    component: HardwareComponent
  },
  {
    path: 'sia-partner',
    loadChildren: './sia-partner/sia-partner.module#SIAPartnerModule'
  },
  {
    path: 'vadp',
    loadChildren: './vadp/vadp.module#VADPModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SIAProgramRoutingModule { }
