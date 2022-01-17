import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { VMSintegrationComponent } from './vms-integration/vms-integration.component';

const routes: Routes = [
  {
    path: 'products/analytics/vms-plug-in',
    component: VMSintegrationComponent
  },
  {
    path: 'products',
    loadChildren:
      './product-list/product-list.module#ProductListModule'
  },

  {
    path: 'support/legacy',
    loadChildren:
      './product-list/product-list.module#ProductListModule'
  },
  {
    path: '',
    loadChildren:
      './product/product.module#ProductModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
