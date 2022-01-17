import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartVcaRoutingModule } from './smart-vca-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SmartVcaContentComponent } from './smart-vca-content/smart-vca-content.component';
import { SmartVcaListComponent } from './smart-vca-list/smart-vca-list.component';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedMaterialModule } from 'projects/dashboard/src/app/shared-material/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SmartVcaRoutingModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SortablejsModule
  ],
  declarations: [
    SmartVcaContentComponent,
    SmartVcaListComponent,
  ]
})
export class SmartVcaModule { }
