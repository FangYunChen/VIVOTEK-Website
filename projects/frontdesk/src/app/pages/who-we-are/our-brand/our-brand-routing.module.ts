import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurBrandComponent } from './components/our-brand.component';

const routes: Routes = [
  {
    path: '',
    component: OurBrandComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurBrandRoutingModule { }
