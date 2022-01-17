import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningAndDevelopmentComponent } from './learning-and-development/learning-and-development.component';
import { EmploymentRelationshipComponent } from './employment-relationship/employment-relationship.component';
import { CompensationAndBenefitComponent } from './compensation-and-benefit/compensation-and-benefit.component';

const routes: Routes = [
  {
    path: 'job-opportunities',
    loadChildren:
      './job-opportunities/job-opportunities.module#JobOpportunitiesModule'
  },
  {
    path: 'working-at-vivotek',
    loadChildren:
      './working-at-vivotek/working-at-vivotek.module#WorkingAtVivotekModule'
  },
  {
    path: 'learning-and-development',
    component: LearningAndDevelopmentComponent
  },
  {
    path: 'employment-relationship',
    component: EmploymentRelationshipComponent
  },
  {
    path: 'compensation-and-benefit',
    component: CompensationAndBenefitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareersRoutingModule {}
