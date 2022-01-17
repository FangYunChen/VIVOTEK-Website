import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudServiceRoutingModule } from './cloud-service-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CloudServiceRoutingModule,
    SharedModule
  ],
  declarations: [
  ]
})
export class CloudServiceModule { }
