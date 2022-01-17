import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LPRComponent } from './lpr/lpr.component';
import { StopAndGoComponent } from './stop-and-go/stop-and-go.component';
import { HighSpeedComponent } from './high-speed/high-speed.component';
import { PartnersComponent } from './partners/partners.component';

const routes: Routes = [
  {
    path: '',
    component: LPRComponent
  },
  {
    path: 'stop-and-go',
    component: StopAndGoComponent
  },
  {
    path: 'high-speed',
    component: HighSpeedComponent
  },
  {
    path: 'partners',
    component: PartnersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LprRoutingModule { }
