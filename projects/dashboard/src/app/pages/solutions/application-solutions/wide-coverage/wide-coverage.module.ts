import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { WideCoverageRoutingModule } from './wide-coverage-routing.module';
import { WideCoverageComponent } from './wide-coverage/wide-coverage.component';
import { Solutions180Component } from './solutions-180/solutions-180.component';
import { Solutions360Component } from './solutions-360/solutions-360.component';
import { MultiSensorComponent } from './multi-sensor/multi-sensor.component';

@NgModule({
  imports: [
    CommonModule,
    WideCoverageRoutingModule,
    SharedModule
  ],
  declarations: [
    WideCoverageComponent,
    Solutions180Component,
    Solutions360Component,
    MultiSensorComponent
  ]
})
export class WideCoverageModule { }
