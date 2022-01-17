import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductContentComponent } from './product-content/product-content.component';
import { ProductPdfInfoComponent } from './product-pdf-info/product-pdf-info.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'tab',
    loadChildren: './tab/tab.module#TabModule'
  },
  {
    path: ':id',
    component: ProductContentComponent
  },
  {
    path: ':id/specification',
    loadChildren: './product-specification/product-specification.module#ProductSpecificationModule'
  },
  {
    path: ':id/selector',
    loadChildren: './selector/selector.module#SelectorModule'
  },
  {
    path: ':id/pdf-info',
    component: ProductPdfInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
