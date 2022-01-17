import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewUserPermissionCountingCamaraListComponent } 
from './review-user-permission-counting-camara-list/review-user-permission-counting-camara-list.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewUserPermissionCountingCamaraListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewUserPermissionCountingCamaraRoutingModule { }
