import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelTypeListComponent } from './model-type-list/model-type-list.component';
import { ModelTypeContentComponent } from './model-type-content/model-type-content.component';


const routes: Routes = [
  {
    path: '',
    component: ModelTypeListComponent
  },
  {
    path: ':id',
    component: ModelTypeContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingViolationDetectionModelTypeRoutingModule { }
