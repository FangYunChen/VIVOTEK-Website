import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {
    path: 'page',
    component: PageComponent
  },
  {
    path: 'model',
    loadChildren: './support-model/parking-violation-detection-support-model.module#ParkingViolationDetectionSupportModelModule'
  },
  {
    path: 'type',
    loadChildren: './model-type/parking-violation-detection-model-type.module#ParkingViolationDetectionModelTypeModule'
  },
  {
    path: 'package',
    loadChildren: './package/parking-violation-detection-package.module#ParkingViolationDetectionPackageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingViolationDetectionSupportRoutingModule { }
