import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartMotionDetectionSupportRoutingModule } from './smart-motion-detection-support-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { PageComponent } from './page/page.component';

@NgModule({
  imports: [
    CommonModule,
    SmartMotionDetectionSupportRoutingModule,
    SharedModule
  ],
  declarations: [
    PageComponent
  ]
})
export class SmartMotionDetectionSupportModule { }
