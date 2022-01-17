import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AEComponent } from './component/ae.component';

const routes: Routes = [
  {
    path: '',
    component: AEComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadsAERoutingModule { }
