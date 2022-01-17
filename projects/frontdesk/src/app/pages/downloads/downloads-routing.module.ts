import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadsComponent } from './downloads/downloads.component';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: './product/downloads-product.module#DownloadsProductModule'
  },
  {
    path: 'sdk',
    loadChildren: './sdk/downloads-sdk.module#DownloadsSdkModule'
  },
  {
    path: 'certificate',
    loadChildren: './certificate/downloads-certificate.module#DownloadsCertificateModule'
  },
  {
    path: 'sales-and-marketing',
    loadChildren: './sales-and-marketing/sales-and-marketing.module#SalesAndMarketingModule'
  },
  {
    path: 'library',
    loadChildren: './library/downloads-library.module#DownloadsLibraryModule'
  },
  {
    path: 'corporate',
    loadChildren: './corporate/downloads-corporate.module#DownloadsCorporateModule'
  },
  {
    path: 'ae',
    loadChildren: './ae/downloads-ae.module#DownloadsAEModule'
  },
  {
    path: 'anpr-package',
    loadChildren: './anpr-package/downloads-anpr-package.module#DownloadsAnprModule'
  },
  {
    path: 'counting-camera-firmware',
    loadChildren: './counting-camara-firmware/downloads-counting-camara-firmware.module#DownloadsCountingCamaraModule'
  },
  {
    path: '',
    component: DownloadsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadsRoutingModule { }
