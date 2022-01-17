import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewUserPermissionListComponent } from './review-user-permission-list/review-user-permission-list.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewUserPermissionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewUserPermissionRoutingModule { }
