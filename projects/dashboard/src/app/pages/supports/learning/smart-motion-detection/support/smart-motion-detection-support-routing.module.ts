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
    loadChildren: './support-model/smart-motion-detection-support-model.module#SmartMotionDetectionSupportModelModule'
  },
  {
    path: 'type',
    loadChildren: './model-type/smart-motion-detection-model-type.module#SmartMotionDetectionModelTypeModule'
  },
  {
    path: 'package',
    loadChildren: './package/smart-motion-detection-package.module#SmartMotionDetectionPackageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartMotionDetectionSupportRoutingModule { }
