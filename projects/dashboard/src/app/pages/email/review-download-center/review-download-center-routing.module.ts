import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyForReviewerComponent } from './apply-for-reviewer/apply-for-reviewer.component';
import { ApplyForUserComponent } from './apply-for-user/apply-for-user.component';
import { UserApplyPassedComponent } from './user-apply-passed/user-apply-passed.component';
import { UserApplyRejectedComponent } from './user-apply-rejected/user-apply-rejected.component';

const routes: Routes = [
  {
    path: 'apply-for-user',
    component: ApplyForUserComponent
  },
  {
    path: 'apply-for-reviewer',
    component: ApplyForReviewerComponent
  },
  {
    path: 'user-apply-passed',
    component: UserApplyPassedComponent
  },
  {
    path: 'user-apply-rejected',
    component: UserApplyRejectedComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewDownloadCenterRoutingModule { }
