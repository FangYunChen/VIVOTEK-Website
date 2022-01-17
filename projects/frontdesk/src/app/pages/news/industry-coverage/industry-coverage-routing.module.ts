import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndustryCoverageComponent } from './components/industry-coverage/industry-coverage.component';

const routes: Routes = [
  {
    path: '',
    component: IndustryCoverageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryCoverageRoutingModule {}
