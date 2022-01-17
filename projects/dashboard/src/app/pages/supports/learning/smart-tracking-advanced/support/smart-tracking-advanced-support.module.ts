import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartTrackingAdvancedSupportRoutingModule } from './smart-tracking-advanced-support-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { PageComponent } from './page/page.component';

@NgModule({
  imports: [
    CommonModule,
    SmartTrackingAdvancedSupportRoutingModule,
    SharedModule
  ],
  declarations: [
    PageComponent
  ]
})
export class SmartTrackingAdvancedSupportModule { }
