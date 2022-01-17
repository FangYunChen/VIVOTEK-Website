import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelPartnerComponent } from './channel-partner/channel-partner.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { AecComponent } from './aec/aec.component';

const routes: Routes = [
  {
    path: 'sia-program',
    loadChildren: './sia-program/sia-program.module#SIAProgramModule'
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
