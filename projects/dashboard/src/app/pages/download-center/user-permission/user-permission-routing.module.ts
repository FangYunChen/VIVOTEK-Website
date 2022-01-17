import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionListComponent } from './user-permission-list/user-permission-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserPermissionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPermissionRoutingModule { }
