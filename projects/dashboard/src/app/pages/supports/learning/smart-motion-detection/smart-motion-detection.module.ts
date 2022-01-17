import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedMaterialModule } from 'projects/dashboard/src/app/shared-material/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SmartMotionDetectionRoutingModule } from './smart-motion-detection-routing.module';
import { SmartMotionDetectionListComponent } from './smart-motion-detection-list/smart-motion-detection-list.component';
import { SmartMotionDetectionContentComponent } from './smart-motion-detection-content/smart-motion-detection-content.component';

@NgModule({
  imports: [
    CommonModule,
    SmartMotionDetectionRoutingModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SortablejsModule
  ],
  declarations: [
    SmartMotionDetectionContentComponent,
    SmartMotionDetectionListComponent,
  ]
})
export class SmartMotionDetectionModule { }
