import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemunerationCommitteeComponent } from './components/remuneration-committee/remuneration-committee.component';

const routes: Routes = [
  {
    path: '',
    component: RemunerationCommitteeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemunerationCommitteeRoutingModule {}
