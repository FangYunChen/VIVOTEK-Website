import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { CompatibilityBccRoutingModule } from './compatibility-bcc-routing.module';
import { BccComponent } from './bcc.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    CompatibilityBccRoutingModule
  ],
  declarations: [
    BccComponent
  ],
})
export class CompatibilityBccModule { }
