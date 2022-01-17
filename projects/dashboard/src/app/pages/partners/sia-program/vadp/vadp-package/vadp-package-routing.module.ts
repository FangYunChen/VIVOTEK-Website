import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VADPPackageListComponent } from './vadp-package-list/vadp-package-list.component';
import { VADPPackageContentComponent } from './vadp-package-content/vadp-package-content.component';

const routes: Routes = [
  {
    path: '',
    component: VADPPackageListComponent
  },
  {
    path: ':id',
    component: VADPPackageContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VADPPackageRoutingModule { }
