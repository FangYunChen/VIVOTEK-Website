import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadCertificateListComponent } from './download-certificate-list/download-certificate-list.component';
import { DownloadCertificateContentComponent } from './download-certificate-content/download-certificate-content.component';

const routes: Routes = [
  {
    path: '',
    component: DownloadCertificateListComponent
  },
  {
    path: ':id',
    component: DownloadCertificateContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadCertificateRoutingModule { }
