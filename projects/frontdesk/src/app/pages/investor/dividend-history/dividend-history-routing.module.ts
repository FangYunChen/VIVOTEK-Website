import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DividendHistoryComponent } from './components/dividend-history/dividend-history.component';

const routes: Routes = [
  {
    path: '',
    component: DividendHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DividendHistoryRoutingModule {}
