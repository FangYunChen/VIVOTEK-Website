import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedEmailModule } from '../shared-email.module';
import { ApplyForReviewerComponent } from './apply-for-reviewer/apply-for-reviewer.component';
import { ReviewProductRoutingModule } from './review-product-routing.module';
import { SenderApplyPassedComponent } from './sender-apply-passed/sender-apply-passed.component';
import { SenderApplyRejectedComponent } from './sender-apply-rejected/sender-apply-rejected.component';


@NgModule({
  imports: [
    CommonModule,
    SharedEmailModule,
    ReviewProductRoutingModule
  ],
  declarations: [
    ApplyForReviewerComponent,
    SenderApplyPassedComponent,
    SenderApplyRejectedComponent
  ],
})
export class ReviewProductModule { }
