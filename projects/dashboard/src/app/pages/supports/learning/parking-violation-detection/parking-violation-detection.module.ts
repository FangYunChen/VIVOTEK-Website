import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedMaterialModule } from 'projects/dashboard/src/app/shared-material/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ParkingViolationDetectionRoutingModule } from './parking-violation-detection-routing.module';
import { ParkingViolationDetectionListComponent } from './parking-violation-detection-list/parking-violation-detection-list.component';
import { ParkingViolationDetectionContentComponent } from './parking-violation-detection-content/parking-violation-detection-content.component';

@NgModule({
  imports: [
    CommonModule,
    ParkingViolationDetectionRoutingModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SortablejsModule
  ],
  declarations: [
    ParkingViolationDetectionContentComponent,
    ParkingViolationDetectionListComponent,
  ]
})
export class ParkingViolationDetectionModule { }
