import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsiderWebinarsRoutingModule } from './insider-webinars-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InsiderWebinarsRoutingModule,
    SharedModule
  ],
  declarations: [
  ]
})
export class InsiderWebinarsModule { }
