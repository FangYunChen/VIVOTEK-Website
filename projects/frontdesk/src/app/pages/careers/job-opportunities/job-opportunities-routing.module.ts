import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobOpportunitiesPageComponent } from './components/job-opportunities-page/job-opportunities-page.component';
import { JobOpportunitiesComponent } from './components/job-opportunities/job-opportunities.component';
import { ResumeEnComponent } from './components/resume-en/resume-en.component';
import { ResumeTwComponent } from './components/resume-tw/resume-tw.component';
import { AbilityComponent } from './components/ability/ability.component';
import { DiceComponent } from './components/dice/dice.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  {
    path: '',
    component: JobOpportunitiesComponent
  },
  {
    path: ':id',
    component: JobOpportunitiesPageComponent
  },
  {
    path: 'resume-en/:id',
    component: ResumeEnComponent
  },
  {
    path: 'resume-tw/:id',
    component: ResumeTwComponent
  },
  {
    path: 'ability/:id',
    component: AbilityComponent
  },
  {
    path: 'dice/:id',
    component: DiceComponent
  },
  {
    path: 'result',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobOpportunitiesRoutingModule {}
