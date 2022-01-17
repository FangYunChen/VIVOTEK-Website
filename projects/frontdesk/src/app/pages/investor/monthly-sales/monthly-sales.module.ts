import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlySalesRoutingModule } from './monthly-sales-routing.module';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { MonthlySalesComponent } from './components/monthly-sales/monthly-sales.component';

@NgModule({
  imports: [CommonModule, MonthlySalesRoutingModule, SharedModule],
  declarations: [MonthlySalesComponent]
})
export class MonthlySalesModule {}
