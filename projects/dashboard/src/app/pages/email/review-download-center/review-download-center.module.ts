import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedEmailModule } from '../shared-email.module';
import { ApplyForReviewerComponent } from './apply-for-reviewer/apply-for-reviewer.component';
import { ApplyForUserComponent } from './apply-for-user/apply-for-user.component';
import { ReviewDownloadCenterRoutingModule } from './review-download-center-routing.module';
import { UserApplyPassedComponent } from './user-apply-passed/user-apply-passed.component';
import { UserApplyRejectedComponent } from './user-apply-rejected/user-apply-rejected.component';


@NgModule({
  imports: [
    CommonModule,
    SharedEmailModule,
    ReviewDownloadCenterRoutingModule,
  ],
  declarations: [
    ApplyForUserComponent,
    ApplyForReviewerComponent,
    UserApplyPassedComponent,
    UserApplyRejectedComponent,
  ],
})
export class ReviewDownloadCenterModule { }
