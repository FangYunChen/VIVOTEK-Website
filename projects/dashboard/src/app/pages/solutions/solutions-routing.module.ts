import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'vertical',
    loadChildren: './vertical-solutions/vertical-solutions.module#VerticalSolutionsModule'
  },
  {
    path: 'application',
    loadChildren: './application-solutions/application-solutions.module#ApplicationSolutionsModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolutionsRoutingModule { }
