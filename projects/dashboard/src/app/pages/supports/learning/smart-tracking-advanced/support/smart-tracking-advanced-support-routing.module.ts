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
    loadChildren: './support-model/smart-tracking-advanced-support-model.module#SmartTrackingAdvancedSupportModelModule'
  },
  {
    path: 'type',
    loadChildren: './model-type/smart-tracking-advanced-model-type.module#SmartTrackingAdvancedModelTypeModule'
  },
  {
    path: 'package',
    loadChildren: './package/smart-tracking-advanced-package.module#SmartTrackingAdvancedPackageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartTrackingAdvancedSupportRoutingModule { }
