import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountingCamaraComponent } from './component/counting-camara-firmware.component';

const routes: Routes = [
  {
    path: '',
    component: CountingCamaraComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadsCountingCamaraRoutingModule { }
