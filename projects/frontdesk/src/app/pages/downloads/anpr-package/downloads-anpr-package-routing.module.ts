import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnprComponent } from './component/anpr-package.component';
import { LoginGuard } from '@frontdesk/core/services/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AnprComponent,
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadsAnprRoutingModule { }
