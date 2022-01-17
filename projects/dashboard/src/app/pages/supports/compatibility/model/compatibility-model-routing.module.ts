import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelContentComponent } from './model-content/model-content.component';

const routes: Routes = [
  {
    path: '',
    component: ModelListComponent
  },
  {
    path: ':id',
    component: ModelContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompatibilityModelRoutingModule { }
