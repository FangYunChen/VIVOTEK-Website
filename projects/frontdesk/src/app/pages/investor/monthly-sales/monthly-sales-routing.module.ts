import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthlySalesComponent } from './components/monthly-sales/monthly-sales.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlySalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlySalesRoutingModule {}
