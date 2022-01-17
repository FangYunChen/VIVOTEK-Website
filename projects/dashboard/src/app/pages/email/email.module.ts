import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmailActivityComponent } from './email-activity/email-activity.component';
import { EmailCompatibilityServiceComponent } from './email-compatibility-service/email-compatibility-service.component';
import { EmailCompatibilityUserComponent } from './email-compatibility-user/email-compatibility-user.component';
import { EmailContactComponent } from './email-contact/email-contact.component';
import { EmailForgetpasswordComponent } from './email-forgetpassword/email-forgetpassword.component';
import { EmailRegisterComponent } from './email-register/email-register.component';
import { EmailReviewPassComponent } from './email-review-pass/email-review-pass.component';
import { EmailReviewRejectComponent } from './email-review-reject/email-review-reject.component';
import { EmailReviewComponent } from './email-review/email-review.component';
import { EmailRoutingModule } from './email-routing.module';
import { EmailSubscriptionComponent } from './email-subscription/email-subscription.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { SharedEmailModule } from './shared-email.module';
import { EmailProjectRegistrationComponent } from './email-project-registration/email-project-registration.component';
import { EmailProjectRegistrationBccComponent } from './email-project-registration-bcc/email-project-registration-bcc.component';


@NgModule({
  imports: [
    CommonModule,
    SharedEmailModule,
    EmailRoutingModule,
  ],
  declarations: [
    EmailTemplateComponent,
    EmailRegisterComponent,
    EmailSubscriptionComponent,
    EmailActivityComponent,
    EmailContactComponent,
    EmailForgetpasswordComponent,
    EmailReviewComponent,
    EmailReviewRejectComponent,
    EmailReviewPassComponent,
    EmailCompatibilityUserComponent,
    EmailCompatibilityServiceComponent,
    EmailProjectRegistrationComponent,
  ]
})
export class EmailModule { }
