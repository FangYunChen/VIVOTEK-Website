import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { IntellectualPropertyComponent } from './components/intellectual-property/intellectual-property.component';
import { LegalComponent } from './components/legal/legal.component';
import { NewsletterVerificationComponent } from './components/newsletter-verification/newsletter-verification.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { RegisterCompleteComponent } from './components/register-complete/register-complete.component';
import { RegisterVerificationComponent } from './components/register-verification/register-verification.component';
import { RegisterComponent } from './components/register/register.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { TrademarksComponent } from './components/trademarks/trademarks.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { LoginGuard } from '@frontdesk/core/services/login.guard';
import { SeeMoreComponent } from './components/see-more/see-more.component';
import { TaaComponent } from './components/taa/taa.component';
import { Vast2Component } from './components/vast2/vast2.component';
import { AmazonKinesisVideoStreamsComponent } from './components/amazon-kinesis-video-streams/amazon-kinesis-video-streams.component';
import { IntelligentVCAComponent } from './components/intelligent-vca/intelligent-vca.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { NDAAComponent } from './components/ndaa/ndaa.component';
import { OnlineTrainingStepComponent } from './components/online-training-step/online-training-step.component';
import { ECommerceComponent } from './components/e-commerce/e-commerce.component';
import { ProjectRegistrationComponent } from './components/project-registration/project-registration.component';
import { KnowAboutCybersecurityComponent } from './components/know-about-cybersecurity/know-about-cybersecurity.component';
import { SortwareDownloadComponent } from './components/software-download/software-download.component';
import { SheperdComponent } from './components/shepherd/shepherd.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'newsletter/verification',
    component: NewsletterVerificationComponent
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register-verification',
    component: RegisterVerificationComponent
  },
  {
    path: 'register-complete',
    component: RegisterCompleteComponent
  },
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent
  },
  {
    path: 'legal',
    component: LegalComponent
  },
  {
    path: 'intellectual-property',
    component: IntellectualPropertyComponent
  },
  {
    path: 'trademarks',
    component: TrademarksComponent
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'project-registration',
    component: ProjectRegistrationComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'see-more-in-smarter-ways',
    component: SeeMoreComponent
  },
  {
    path: 'cybersecurity',
    loadChildren: './components/cybersecurity/cybersecurity.module#CybersecurityModule'
  },
  {
    path: 'vivotek-s-taa-compliant-products',
    component: TaaComponent
  },
  {
    path: 'vast2',
    component: Vast2Component
  }
  ,
  {
    path: 'Shepherd',
    component: SheperdComponent
  },
  {
    path: 'oss',
    loadChildren: './components/oss/oss.module#OssModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'amazon-kinesis-video-streams',
    component: AmazonKinesisVideoStreamsComponent
  },
  {
    path: 'intelligent-vca',
    component: IntelligentVCAComponent
  },
  {
    path: 'ndaa',
    component: NDAAComponent
  },
  {
    path: 'sitemap',
    component: SitemapComponent
  },
  {
    path: 'online-training-step',
    component: OnlineTrainingStepComponent
  },
  {
    path: 'e-commerce',
    component: ECommerceComponent
  },
  {
    path: 'what-you-should-know-about-cybersecurity',
    component: KnowAboutCybersecurityComponent
  },
  {
    path: 'software-download',
    component: SortwareDownloadComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
