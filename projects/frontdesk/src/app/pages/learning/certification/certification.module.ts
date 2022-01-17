import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CertificationRoutingModule } from './certification-routing.module';
import { VECIIComponent } from './vecii/vecii.component';
import { VPENorthAmericaComponent } from './vpe-north-america/vpe-north-america.component';
import { SharedModule } from '@frontdesk/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CertificationRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    VECIIComponent,
    VPENorthAmericaComponent,
  ]
})
export class CertificationModule { }
