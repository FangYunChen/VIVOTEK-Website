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
    loadChildren: './support-model/restricted-zone-detection-support-model.module#RestrictedZoneDetectionSupportModelModule'
  },
  {
    path: 'type',
    loadChildren: './model-type/restricted-zone-detection-model-type.module#RestrictedZoneDetectionModelTypeModule'
  },
  {
    path: 'package',
    loadChildren: './package/restricted-zone-detection-package.module#RestrictedZoneDetectionPackageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestrictedZoneDetectionSupportRoutingModule { }
