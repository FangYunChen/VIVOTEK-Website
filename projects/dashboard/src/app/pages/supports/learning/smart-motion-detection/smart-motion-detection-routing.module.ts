import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmartMotionDetectionListComponent } from './smart-motion-detection-list/smart-motion-detection-list.component';
import { SmartMotionDetectionContentComponent } from './smart-motion-detection-content/smart-motion-detection-content.component';

const routes: Routes = [
  {
    path: '',
    component: SmartMotionDetectionListComponent
  },
  {
    path: ':id',
    component: SmartMotionDetectionContentComponent
  },
  {
    path: 'support',
    loadChildren: './support/smart-motion-detection-support.module#SmartMotionDetectionSupportModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartMotionDetectionRoutingModule { }
