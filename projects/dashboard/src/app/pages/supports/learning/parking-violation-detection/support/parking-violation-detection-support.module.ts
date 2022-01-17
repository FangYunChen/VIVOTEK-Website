import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingViolationDetectionSupportRoutingModule } from './parking-violation-detection-support-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { PageComponent } from './page/page.component';

@NgModule({
  imports: [
    CommonModule,
    ParkingViolationDetectionSupportRoutingModule,
    SharedModule
  ],
  declarations: [
    PageComponent
  ]
})
export class ParkingViolationDetectionSupportModule { }
