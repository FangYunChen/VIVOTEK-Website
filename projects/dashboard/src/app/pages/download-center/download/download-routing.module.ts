import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadListComponent } from './download-list/download-list.component';
import { DownloadContentComponent } from './download-content/download-content.component';

const routes: Routes = [
  {
    path: '',
    component: DownloadListComponent
  },
  {
    path: ':id',
    component: DownloadContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule { }
