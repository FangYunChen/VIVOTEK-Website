import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CareersRoutingModule } from './careers-routing.module';
import { LearningAndDevelopmentComponent } from './learning-and-development/learning-and-development.component';
import { EmploymentRelationshipComponent } from './employment-relationship/employment-relationship.component';
import { CompensationAndBenefitComponent } from './compensation-and-benefit/compensation-and-benefit.component';

@NgModule({
  imports: [
    CommonModule,
    CareersRoutingModule,
    SharedModule
  ],
  declarations: [
    LearningAndDevelopmentComponent,
    EmploymentRelationshipComponent,
    CompensationAndBenefitComponent
  ]
})
export class CareersModule { }
