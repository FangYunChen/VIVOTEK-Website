import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VMSintegrationListComponent } from './vms-integration-list/vms-integration-list.component';
import { VMSintegrationContentComponent } from './vms-integration-content/vms-integration-content.component';

const routes: Routes = [
  {
    path: '',
    component: VMSintegrationListComponent
  },
  {
    path: ':id',
    component: VMSintegrationContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VMSintegrationRoutingModule { }
