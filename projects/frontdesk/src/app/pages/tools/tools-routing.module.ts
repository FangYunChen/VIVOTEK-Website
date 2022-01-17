import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'product-selector',
    loadChildren: './product-selector/product-selector.module#ProductSelectorModule'
  },
  {
    path: 'product-selector-compare',
    loadChildren: './product-selector-compare/product-selector-compare.module#ProductSelectorCompareModule'
  },
  {
    path: 'design-tool',
    loadChildren: './design-tool/design-tool.module#DesignToolModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
