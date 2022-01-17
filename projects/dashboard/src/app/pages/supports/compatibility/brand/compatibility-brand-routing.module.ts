import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandContentComponent } from './brand-content/brand-content.component';

const routes: Routes = [
  {
    path: '',
    component: BrandListComponent
  },
  {
    path: ':id',
    component: BrandContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompatibilityBrandRoutingModule { }
