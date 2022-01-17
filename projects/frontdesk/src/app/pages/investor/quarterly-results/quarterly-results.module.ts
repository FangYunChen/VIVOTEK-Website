import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuarterlyResultsRoutingModule } from './quarterly-results-routing.module';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { QuarterlyResultsComponent } from './components/quarterly-results/quarterly-results.component';

@NgModule({
  imports: [CommonModule, QuarterlyResultsRoutingModule, SharedModule],
  declarations: [QuarterlyResultsComponent]
})
export class QuarterlyResultsModule {}
