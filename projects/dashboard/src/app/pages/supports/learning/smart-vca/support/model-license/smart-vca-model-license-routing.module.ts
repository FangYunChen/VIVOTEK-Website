import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelLicenseListComponent } from './model-license-list/model-license-list.component';
import { ModelLicenseContentComponent } from './model-license-content/model-license-content.component';


const routes: Routes = [
  {
    path: '',
    component: ModelLicenseListComponent
  },
  {
    path: ':id',
    component: ModelLicenseContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartVcaModelLicenseRoutingModule { }
