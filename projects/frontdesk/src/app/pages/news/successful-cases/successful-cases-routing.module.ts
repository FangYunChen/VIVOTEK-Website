import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessfulCasesComponent } from './components/successful-cases/successful-cases.component';
import { SuccessfulCasesPageComponent } from './components/successful-cases-page/successful-cases-page.component';

const routes: Routes = [
  {
    path: '',
    component: SuccessfulCasesComponent
  },
  {
    path: ':id',
    component: SuccessfulCasesPageComponent
  },
  {
    path: ':id/:title',
    component: SuccessfulCasesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccessfulCasesRoutingModule { }
