import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { AwardsRoutingModule } from './awards-routing.module';
import { AwardsComponent } from './components/awards/awards.component';

@NgModule({
  imports: [CommonModule, AwardsRoutingModule, SharedModule],
  declarations: [AwardsComponent]
})
export class AwardsModule {}
