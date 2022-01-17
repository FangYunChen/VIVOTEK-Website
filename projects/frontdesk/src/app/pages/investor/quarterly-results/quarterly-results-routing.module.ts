import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuarterlyResultsComponent } from './components/quarterly-results/quarterly-results.component';

const routes: Routes = [
  {
    path: '',
    component: QuarterlyResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuarterlyResultsRoutingModule {}
