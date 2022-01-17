import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { VvtkPipeModule } from '../../../../shared/pipes/vvtk-pipe.module';
import { IconRoutingModule } from './icon-routing.module';
import { IconListComponent } from './icon-list/icon-list.component';
import { IconContentComponent } from './icon-content/icon-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    VvtkPipeModule,
    IconRoutingModule
  ],
  declarations: [
    IconListComponent,
    IconContentComponent
  ]
})
export class IconModule { }
