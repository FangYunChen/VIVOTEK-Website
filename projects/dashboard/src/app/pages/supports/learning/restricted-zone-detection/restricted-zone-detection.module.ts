import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedMaterialModule } from 'projects/dashboard/src/app/shared-material/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RestrictedZoneDetectionRoutingModule } from './restricted-zone-detection-routing.module';
import { RestrictedZoneDetectionListComponent } from './restricted-zone-detection-list/restricted-zone-detection-list.component';
import { RestrictedZoneDetectionContentComponent } from './restricted-zone-detection-content/restricted-zone-detection-content.component';

@NgModule({
  imports: [
    CommonModule,
    RestrictedZoneDetectionRoutingModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SortablejsModule
  ],
  declarations: [
    RestrictedZoneDetectionContentComponent,
    RestrictedZoneDetectionListComponent,
  ]
})
export class RestrictedZoneDetectionModule { }
