import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyForReviewerComponent } from './apply-for-reviewer/apply-for-reviewer.component';
import { SenderApplyPassedComponent } from './sender-apply-passed/sender-apply-passed.component';
import { SenderApplyRejectedComponent } from './sender-apply-rejected/sender-apply-rejected.component';

const routes: Routes = [
  {
    path: 'apply-for-reviewer',
    component: ApplyForReviewerComponent
  },
  {
    path: 'sender-apply-passed',
    component: SenderApplyPassedComponent
  },
  {
    path: 'sender-apply-rejected',
    component: SenderApplyRejectedComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewProductRoutingModule { }
