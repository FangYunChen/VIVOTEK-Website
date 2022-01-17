import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailActivityComponent } from './email-activity/email-activity.component';
import { EmailCompatibilityServiceComponent } from './email-compatibility-service/email-compatibility-service.component';
import { EmailCompatibilityUserComponent } from './email-compatibility-user/email-compatibility-user.component';
import { EmailContactComponent } from './email-contact/email-contact.component';
import { EmailForgetpasswordComponent } from './email-forgetpassword/email-forgetpassword.component';
import { EmailRegisterComponent } from './email-register/email-register.component';
import { EmailReviewPassComponent } from './email-review-pass/email-review-pass.component';
import { EmailReviewRejectComponent } from './email-review-reject/email-review-reject.component';
import { EmailReviewComponent } from './email-review/email-review.component';
import { EmailSubscriptionComponent } from './email-subscription/email-subscription.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { EmailProjectRegistrationComponent } from './email-project-registration/email-project-registration.component';
import { EmailProjectRegistrationBccComponent } from './email-project-registration-bcc/email-project-registration-bcc.component';

const routes: Routes = [
  {
    path: 'review',
    component: EmailReviewComponent
  },
  {
    path: 'review/reject',
    component: EmailReviewRejectComponent
  },
  {
    path: 'review/pass',
    component: EmailReviewPassComponent
  },
  {
    path: 'activity',
    component: EmailActivityComponent
  },
  {
    path: 'subscription',
    component: EmailSubscriptionComponent
  },
  {
    path: 'register',
    component: EmailRegisterComponent
  },
  {
    path: 'project-registration',
    component: EmailProjectRegistrationComponent
  },
  {
    path: 'project-registration-bcc',
    component: EmailProjectRegistrationBccComponent
  },
  {
    path: 'forgetpassword',
    component: EmailForgetpasswordComponent
  },
  {
    path: 'contact',
    component: EmailContactComponent
  },
  {
    path: 'template',
    component: EmailTemplateComponent
  },
  {
    path: 'compatibility-user',
    component: EmailCompatibilityUserComponent
  },
  {
    path: 'compatibility-service',
    component: EmailCompatibilityServiceComponent
  },
  {
    path: 'review-download-center',
    loadChildren: './review-download-center/review-download-center.module#ReviewDownloadCenterModule'
  },
  {
    path: 'review-product',
    loadChildren: './review-product/review-product.module#ReviewProductModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
