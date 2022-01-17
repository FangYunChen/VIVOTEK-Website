import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { CorporateGovernanceComponent } from './components/corporate-governance/corporate-governance.component';
import { CorporateGovernanceRoutingModule } from './corporate-governance-routing.module';

@NgModule({
  imports: [CommonModule, CorporateGovernanceRoutingModule, SharedModule],
  declarations: [CorporateGovernanceComponent]
})
export class CorporateGovernanceModule {}
