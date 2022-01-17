import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { SortablejsModule } from 'angular-sortablejs';
import { LearningRoutingModule } from './learning-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule,
    LearningRoutingModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SortablejsModule],
  declarations: [
  ]
})
export class LearningModule { }
