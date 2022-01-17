import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { OverviewComponent } from './components/overview.component';
import { OverviewRoutingModule } from './overview-routing.module';

@NgModule({
  imports: [CommonModule, OverviewRoutingModule, SharedModule],
  declarations: [OverviewComponent]
})
export class OverviewModule {}
