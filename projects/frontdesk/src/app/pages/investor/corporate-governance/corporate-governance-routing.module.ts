import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateGovernanceComponent } from './components/corporate-governance/corporate-governance.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateGovernanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateGovernanceRoutingModule {}
