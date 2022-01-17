import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VADPRoutingModule } from './vadp-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { VADPIntroComponent } from './vadp-intro/vadp-intro.component';
import { VADPPartnerComponent } from './vadp-partner/vadp-partner.component';

@NgModule({
  imports: [
    CommonModule,
    VADPRoutingModule,
    SharedModule
  ],
  declarations: [
    VADPIntroComponent,
    VADPPartnerComponent
  ]
})
export class VADPModule { }
