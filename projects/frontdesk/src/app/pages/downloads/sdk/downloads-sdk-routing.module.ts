import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SdkComponent } from './component/sdk.component';

const routes: Routes = [
  {
    path: '',
    component: SdkComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadsSdkRoutingModule { }
