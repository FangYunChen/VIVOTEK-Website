import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ChannelPartnerComponent } from './channel-partner/channel-partner.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { AecComponent } from './aec/aec.component';

@NgModule({
  imports: [
    CommonModule,
    PartnersRoutingModule,
    SharedModule
  ],
  declarations: [
    ChannelPartnerComponent,
    GuidelineComponent,
    AecComponent
  ]
})
export class PartnersModule { }
