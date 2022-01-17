import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CanActivateProduct } from './can-activate-product';

const routes: Routes = [
  {
    path: ':productName',
    canActivate: [CanActivateProduct],
    component: HomeComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
