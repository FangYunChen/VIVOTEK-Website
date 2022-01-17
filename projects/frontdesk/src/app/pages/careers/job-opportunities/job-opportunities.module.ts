import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { AbilityComponent } from './components/ability/ability.component';
import { DiceComponent } from './components/dice/dice.component';
import { JobOpportunitiesPageComponent } from './components/job-opportunities-page/job-opportunities-page.component';
import { JobOpportunitiesComponent } from './components/job-opportunities/job-opportunities.component';
import { ResultComponent } from './components/result/result.component';
import { ResumeEnComponent } from './components/resume-en/resume-en.component';
import { ResumeTwComponent } from './components/resume-tw/resume-tw.component';
import { JobOpportunitiesRoutingModule } from './job-opportunities-routing.module';
import { SortablejsModule } from 'angular-sortablejs/dist';

@NgModule({
  imports: [
    CommonModule,
    JobOpportunitiesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    SortablejsModule
  ],
  declarations: [
    JobOpportunitiesComponent,
    JobOpportunitiesPageComponent,
    ResumeTwComponent,
    ResumeEnComponent,
    AbilityComponent,
    DiceComponent,
    ResultComponent
  ]
})
export class JobOpportunitiesModule {}
