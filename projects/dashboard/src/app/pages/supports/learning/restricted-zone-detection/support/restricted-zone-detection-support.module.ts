import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestrictedZoneDetectionSupportRoutingModule } from './restricted-zone-detection-support-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { PageComponent } from './page/page.component';

@NgModule({
  imports: [
    CommonModule,
    RestrictedZoneDetectionSupportRoutingModule,
    SharedModule
  ],
  declarations: [
    PageComponent
  ]
})
export class RestrictedZoneDetectionSupportModule { }
