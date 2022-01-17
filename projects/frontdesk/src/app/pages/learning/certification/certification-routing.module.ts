import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VECIIComponent } from './vecii/vecii.component';
import { VPENorthAmericaComponent } from './vpe-north-america/vpe-north-america.component';

const routes: Routes = [
  {
    path: 'vecii',
    component: VECIIComponent
  },
  {
    path: 'vpe',
    component: VPENorthAmericaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificationRoutingModule { }
