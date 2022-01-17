import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SIAPartnerRoutingModule } from './sia-partner-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { VvtkPipeModule } from '../../../../shared/pipes/vvtk-pipe.module';
import { SIAPartnerListComponent } from './sia-partner-list/sia-partner-list.component';
import { SIAPartnerContentComponent } from './sia-partner-content/sia-partner-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SIAPartnerRoutingModule,
    SharedModule,
    SharedMaterialModule,
    VvtkPipeModule
  ],
  declarations: [
    SIAPartnerListComponent,
    SIAPartnerContentComponent
  ]
})
export class SIAPartnerModule { }
