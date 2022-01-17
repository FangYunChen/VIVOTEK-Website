import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkingViolationDetectionListComponent } from './parking-violation-detection-list/parking-violation-detection-list.component';
import { ParkingViolationDetectionContentComponent } from './parking-violation-detection-content/parking-violation-detection-content.component';

const routes: Routes = [
  {
    path: '',
    component: ParkingViolationDetectionListComponent
  },
  {
    path: ':id',
    component: ParkingViolationDetectionContentComponent
  },
  {
    path: 'support',
    loadChildren: './support/parking-violation-detection-support.module#ParkingViolationDetectionSupportModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingViolationDetectionRoutingModule { }
