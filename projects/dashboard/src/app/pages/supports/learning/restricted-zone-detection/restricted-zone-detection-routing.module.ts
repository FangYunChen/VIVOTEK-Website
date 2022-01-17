import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestrictedZoneDetectionListComponent } from './restricted-zone-detection-list/restricted-zone-detection-list.component';
import { RestrictedZoneDetectionContentComponent } from './restricted-zone-detection-content/restricted-zone-detection-content.component';

const routes: Routes = [
  {
    path: '',
    component: RestrictedZoneDetectionListComponent
  },
  {
    path: ':id',
    component: RestrictedZoneDetectionContentComponent
  },
  {
    path: 'support',
    loadChildren: './support/restricted-zone-detection-support.module#RestrictedZoneDetectionSupportModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestrictedZoneDetectionRoutingModule { }
