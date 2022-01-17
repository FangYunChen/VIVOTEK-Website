import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSpecificationComponent } from './product-specification.component';

const routes: Routes = [
  {
    path: '',
    component: ProductSpecificationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSpecificationRoutingModule { }
