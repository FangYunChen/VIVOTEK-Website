import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageContentComponent } from './package-content/package-content.component';


const routes: Routes = [
  {
    path: '',
    component: PackageListComponent
  },
  {
    path: ':id',
    component: PackageContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartVcaPackageRoutingModule { }
