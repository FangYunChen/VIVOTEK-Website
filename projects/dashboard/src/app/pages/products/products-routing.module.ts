import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'software',
    loadChildren: './software/software.module#SoftwareModule'
  },
  {
    path: 'cloud-service',
    loadChildren: './cloud-service/cloud-service.module#CloudServiceModule'
  },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule'
  },
  {
    path: 'specification',
    loadChildren: './specification/specification.module#SpecificationModule'
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule'
  },
  {
    path: 'review',
    loadChildren: './review/product-review.module#ProductReviewModule'
  },
  {
    path: 'datasheet',
    loadChildren: './datasheet/datasheet.module#DatasheetModule'
  },
  {
    path: 'analytics/vms-plug-in',
    loadChildren: './vms-integration/vms-integration.module#VMSintegrationModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
