import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { ShareholderListRoutingModule } from './shareholder-list-routing.module';
import { ShareholderListComponent } from './components/shareholder-list/shareholder-list.component';

@NgModule({
  imports: [CommonModule, ShareholderListRoutingModule, SharedModule],
  declarations: [ShareholderListComponent]
})
export class ShareholderListModule {}
