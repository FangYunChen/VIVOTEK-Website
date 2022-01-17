import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'category',
    loadChildren: './category/compatibility-category.module#CompatibilityCategoryModule'
  },
  {
    path: 'product',
    loadChildren: './product/compatibility-product.module#CompatibilityProductModule'
  },
  {
    path: 'feature',
    loadChildren: './feature/compatibility-feature.module#CompatibilityFeatureModule'
  },
  {
    path: 'brand',
    loadChildren: './brand/compatibility-brand.module#CompatibilityBrandModule'
  },
  {
    path: 'model',
    loadChildren: './model/compatibility-model.module#CompatibilityModelModule'
  },
  {
    path: 'bcc',
    loadChildren: './bcc/compatibility-bcc.module#CompatibilityBccModule'
  },
  {
    path: 'suggestion-list',
    loadChildren: './suggestion-list/compatibility-suggestion-list.module#CompatibilitySuggestionListModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompatibilityRoutingModule { }
