import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WideCoverageComponent } from './wide-coverage/wide-coverage.component';
import { Solutions180Component } from './solutions-180/solutions-180.component';
import { Solutions360Component } from './solutions-360/solutions-360.component';
import { MultiSensorComponent } from './multi-sensor/multi-sensor.component';

const routes: Routes = [
  {
    path: '',
    component: WideCoverageComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WideCoverageRoutingModule { }
