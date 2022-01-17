import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { MilestoneComponent } from './components/milestone/milestone.component';
import { MileStoneRoutingModule } from './mile-stone-routing.module';

@NgModule({
  imports: [CommonModule, MileStoneRoutingModule, SharedModule],
  declarations: [MilestoneComponent]
})
export class MileStoneModule {}
