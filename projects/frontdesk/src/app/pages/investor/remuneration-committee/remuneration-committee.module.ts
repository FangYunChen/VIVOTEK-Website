import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemunerationCommitteeRoutingModule } from './remuneration-committee-routing.module';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { RemunerationCommitteeComponent } from './components/remuneration-committee/remuneration-committee.component';

@NgModule({
  imports: [CommonModule, RemunerationCommitteeRoutingModule, SharedModule],
  declarations: [RemunerationCommitteeComponent]
})
export class RemunerationCommitteeModule {}
