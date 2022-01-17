import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WorkingAtVivotekComponent } from './components/working-at-vivotek/working-at-vivotek.component';
import { WorkingAtVivotekRoutingModule } from './working-at-vivotek-routing.module';
import { SharedModule } from '@frontdesk/shared/shared.module';

@NgModule({
  imports: [CommonModule, WorkingAtVivotekRoutingModule, SharedModule],
  declarations: [WorkingAtVivotekComponent]
})
export class WorkingAtVivotekModule {}
