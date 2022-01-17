import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartVcaSupportRoutingModule } from './smart-vca-support-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { PageComponent } from './page/page.component';

@NgModule({
  imports: [
    CommonModule,
    SmartVcaSupportRoutingModule,
    SharedModule
  ],
  declarations: [
    PageComponent
  ]
})
export class SmartVcaSupportModule { }
