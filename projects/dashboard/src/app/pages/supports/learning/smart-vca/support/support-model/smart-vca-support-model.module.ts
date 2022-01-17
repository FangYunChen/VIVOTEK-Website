import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SmartVcaSupportModelRoutingModule } from './smart-vca-support-model-routing.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../../../shared-material/shared-material.module';
import { VvtkPipeModule } from '../../../../../../shared/pipes/vvtk-pipe.module';
import { SupportModelListComponent } from './support-model-list/support-model-list.component';
import { SupportModelContentComponent } from './support-model-content/support-model-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SmartVcaSupportModelRoutingModule,
    SharedModule,
    SharedMaterialModule,
    VvtkPipeModule
  ],
  declarations: [
    SupportModelListComponent,
    SupportModelContentComponent
  ]
})
export class SmartVcaSupportModelModule { }
