import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedMaterialModule } from 'projects/dashboard/src/app/shared-material/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { VMSintegrationRoutingModule } from './vms-integration-routing.module';
import { VMSintegrationListComponent } from './vms-integration-list/vms-integration-list.component';
import { VMSintegrationContentComponent } from './vms-integration-content/vms-integration-content.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VMSintegrationRoutingModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SortablejsModule
  ],
  declarations: [
    VMSintegrationContentComponent,
    VMSintegrationListComponent,
  ]
})
export class VMSintegrationModule { }
