import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportsRoutingModule } from './supports-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { WarrantyRmaComponent } from './warranty-rma/warranty-rma.component';
import { TroubleShootingComponent } from './trouble-shooting/trouble-shooting.component';
import { SupportCenterComponent } from './center/center.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SupportsRoutingModule
  ],
  declarations: [
    WarrantyRmaComponent,
    TroubleShootingComponent,
    SupportCenterComponent
  ]
})
export class SupportsModule { }
