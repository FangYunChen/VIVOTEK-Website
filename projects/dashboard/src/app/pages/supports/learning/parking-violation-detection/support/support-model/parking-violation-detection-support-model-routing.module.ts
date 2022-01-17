import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportModelListComponent } from './support-model-list/support-model-list.component';
import { SupportModelContentComponent } from './support-model-content/support-model-content.component';


const routes: Routes = [
  {
    path: '',
    component: SupportModelListComponent
  },
  {
    path: ':id',
    component: SupportModelContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingViolationDetectionSupportModelRoutingModule { }
