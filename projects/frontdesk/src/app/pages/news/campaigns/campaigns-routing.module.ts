import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { CampaignsPageComponent } from './components/campaigns-page/campaigns-page.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignsComponent
  },
  {
    path: ':id',
    component: CampaignsPageComponent
  },
  {
    path: ':id/:title',
    component: CampaignsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
