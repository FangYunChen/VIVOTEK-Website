import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VADPIntroComponent } from './vadp-intro/vadp-intro.component';
import { VADPPartnerComponent } from './vadp-partner/vadp-partner.component';

const routes: Routes = [
  {
    path: 'vadp-intro',
    component: VADPIntroComponent
  },
  {
    path: 'vadp-package',
    loadChildren: './vadp-package/vadp-package.module#VADPPackageModule'
  },
  {
    path: 'vadp-partner',
    component: VADPPartnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VADPRoutingModule { }
