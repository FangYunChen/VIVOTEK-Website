import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestorConferenceComponent } from './components/investor-conference/investor-conference.component';

const routes: Routes = [
  {
    path: '',
    component: InvestorConferenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorConferenceRoutingModule {}
