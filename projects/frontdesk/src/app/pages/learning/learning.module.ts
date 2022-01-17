import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { VWAComponent } from './vwa/vwa/vwa.component';
import { InsiderWebinarsComponent } from './insider-webinars/insider-webinars.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, LearningRoutingModule, SharedModule,
    FormsModule],
  declarations: [VWAComponent,
    InsiderWebinarsComponent]
})
export class LearningModule {}
