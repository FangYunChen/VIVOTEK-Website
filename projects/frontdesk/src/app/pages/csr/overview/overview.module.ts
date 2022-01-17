import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { OverviewComponent } from './componenets/overview/overview.component';

@NgModule({
  imports: [CommonModule, OverviewRoutingModule, SharedModule],
  declarations: [OverviewComponent]
})
export class OverviewModule {}
