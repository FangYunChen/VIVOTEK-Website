import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { LprRoutingModule } from './lpr-routing.module';
import { LPRComponent } from './lpr/lpr.component';
import { HighSpeedComponent } from './high-speed/high-speed.component';
import { PartnersComponent } from './partners/partners.component';
import { StopAndGoComponent } from './stop-and-go/stop-and-go.component';

@NgModule({
  imports: [
    CommonModule,
    LprRoutingModule,
    SharedModule
  ],
  declarations: [
    LPRComponent,
    HighSpeedComponent,
    PartnersComponent,
    StopAndGoComponent
  ]
})
export class LprModule { }
