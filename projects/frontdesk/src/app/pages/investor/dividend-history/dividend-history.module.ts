import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DividendHistoryRoutingModule } from './dividend-history-routing.module';
import { DividendHistoryComponent } from './components/dividend-history/dividend-history.component';
import { SharedModule } from '@frontdesk/shared/shared.module';

@NgModule({
  imports: [CommonModule, DividendHistoryRoutingModule, SharedModule],
  declarations: [DividendHistoryComponent]
})
export class DividendHistoryModule {}
