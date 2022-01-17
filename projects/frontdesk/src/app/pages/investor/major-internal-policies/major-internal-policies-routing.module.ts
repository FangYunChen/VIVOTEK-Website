import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MajorInternalPoliciesComponent } from './components/major-internal-policies/major-internal-policies.component';

const routes: Routes = [
  {
    path: '',
    component: MajorInternalPoliciesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MajorInternalPoliciesRoutingModule {}
