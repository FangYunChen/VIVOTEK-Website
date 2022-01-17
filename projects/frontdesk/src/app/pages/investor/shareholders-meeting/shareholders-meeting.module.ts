import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareholdersMeetingRoutingModule } from './shareholders-meeting-routing.module';
import { ShareholdersMeetingComponent } from './components/shareholders-meeting/shareholders-meeting.component';
import { SharedModule } from '@frontdesk/shared/shared.module';

@NgModule({
  imports: [CommonModule, ShareholdersMeetingRoutingModule, SharedModule],
  declarations: [ShareholdersMeetingComponent]
})
export class ShareholdersMeetingModule {}
