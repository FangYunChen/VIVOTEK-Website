import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewerPermissionListComponent } from './reviewer-permission-list/reviewer-permission-list.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewerPermissionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerPermissionRoutingModule { }
