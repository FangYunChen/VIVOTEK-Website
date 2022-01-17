import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'download',
    loadChildren: './download/download.module#DownloadModule'
  },
  {
    path: 'download-certificate',
    loadChildren: './download-certificate/download-certificate.module#DownloadCertificateModule'
  },
  {
    path: 'document-type',
    loadChildren: './document-type/document-type.module#DocumentTypeModule'
  },
  {
    path: 'review-user-permission',
    loadChildren: './review-user-permission/review-user-permission.module#ReviewUserPermissionModule'
  },
  {
    path: 'reviewer-permission',
    loadChildren: './reviewer-permission/reviewer-permission.module#ReviewerPermissionModule'
  },
  {
    path: 'user-permission',
    loadChildren: './user-permission/user-permission.module#UserPermissionModule'
  },
  {
    path: 'review-user-permission-counting-camara',
    loadChildren: './review-user-permission-counting-camara/review-user-permission-counting-camara.module#ReviewUserPermissionCountingCamaraModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadCenterRoutingModule { }
