import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorConferenceRoutingModule } from './investor-conference-routing.module';
import { InvestorConferenceComponent } from './components/investor-conference/investor-conference.component';
import { SharedModule } from '@frontdesk/shared/shared.module';

@NgModule({
  imports: [CommonModule, InvestorConferenceRoutingModule, SharedModule],
  declarations: [InvestorConferenceComponent]
})
export class InvestorConferenceModule {}
