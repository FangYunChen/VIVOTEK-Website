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
    loadChildren: './support-model/smart-vca-support-model.module#SmartVcaSupportModelModule'
  },
  {
    path: 'type',
    loadChildren: './model-type/smart-vca-model-type.module#SmartVcaModelTypeModule'
  },
  {
    path: 'license',
    loadChildren: './model-license/smart-vca-model-license.module#SmartVcaModelLicenseModule'
  },
  {
    path: 'package',
    loadChildren: './package/smart-vca-package.module#SmartVcaPackageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartVcaSupportRoutingModule { }
