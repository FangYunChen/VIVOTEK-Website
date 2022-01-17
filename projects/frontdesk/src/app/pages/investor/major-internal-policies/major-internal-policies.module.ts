import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MajorInternalPoliciesRoutingModule } from './major-internal-policies-routing.module';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { MajorInternalPoliciesComponent } from './components/major-internal-policies/major-internal-policies.component';

@NgModule({
  imports: [CommonModule, MajorInternalPoliciesRoutingModule, SharedModule],
  declarations: [MajorInternalPoliciesComponent]
})
export class MajorInternalPoliciesModule {}
