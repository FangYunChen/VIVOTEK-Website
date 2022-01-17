import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryContentComponent } from './category-content/category-content.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: ':id',
    component: CategoryContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompatibilityCategoryRoutingModule { }
