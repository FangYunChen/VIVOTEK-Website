import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { CompatibilityRoutingModule } from './compatibility-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CompatibilityRoutingModule,
  ],
  declarations: []
})
export class CompatibilityModule { }
