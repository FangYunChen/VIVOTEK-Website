import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VWARoutingModule } from './vwa-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { OnlineTrainingComponent } from './online-training/online-training.component';
import { VECComponent } from './vec/vec.component';
import { VECIIComponent } from './vecii/vecii.component';
import { VPENorthAmericaComponent } from './vpe-north-america/vpe-north-america.component';
import { CourseComponent } from './course/course.component';
import { InsiderWebinarsComponent } from './insider-webinars/insider-webinars.component';

@NgModule({
  imports: [
    CommonModule,
    VWARoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    OnlineTrainingComponent,
    VECComponent,
    VECIIComponent,
    VPENorthAmericaComponent,
    CourseComponent,
    InsiderWebinarsComponent
  ]
})
export class VWAModule { }
