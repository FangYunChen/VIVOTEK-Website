import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeSectionComponent } from './components/home-section/home-section.component';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { HomeComponent } from './components/home/home.component';
import { NewsletterVerificationComponent } from './components/newsletter-verification/newsletter-verification.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { HomeRoutingModule } from './home-routing.module';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterVerificationComponent } from './components/register-verification/register-verification.component';
import { RegisterCompleteComponent } from './components/register-complete/register-complete.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { LegalComponent } from './components/legal/legal.component';
import { IntellectualPropertyComponent } from './components/intellectual-property/intellectual-property.component';
import { TrademarksComponent } from './components/trademarks/trademarks.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { SeeMoreComponent } from './components/see-more/see-more.component';
import { TaaComponent } from './components/taa/taa.component';
import { Vast2Component } from './components/vast2/vast2.component';
import { AmazonKinesisVideoStreamsComponent } from './components/amazon-kinesis-video-streams/amazon-kinesis-video-streams.component';
import { MatCardModule, MatTableModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApplyAuthorityComponent } from './components/my-account/apply-authority/apply-authority.component';
import { RecoverAuthorityComponent } from './components/my-account/recover-authority/recover-authority.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { IntelligentVCAComponent } from './components/intelligent-vca/intelligent-vca.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { NDAAComponent } from './components/ndaa/ndaa.component';
import { OnlineTrainingStepComponent } from './components/online-training-step/online-training-step.component';
import { ECommerceComponent } from './components/e-commerce/e-commerce.component';
import { ProjectRegistrationComponent } from './components/project-registration/project-registration.component';
import { KnowAboutCybersecurityComponent } from './components/know-about-cybersecurity/know-about-cybersecurity.component';
import { SortwareDownloadComponent } from './components/software-download/software-download.component';
import { SheperdComponent } from './components/shepherd/shepherd.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    CdkTableModule,
    MatTableModule
  ],
  declarations: [
    HomeComponent,
    HomeSectionComponent,
    HomeSliderComponent,
    NewsletterComponent,
    NewsletterVerificationComponent,
    ContactUsComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    RegisterVerificationComponent,
    RegisterCompleteComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    LegalComponent,
    IntellectualPropertyComponent,
    TrademarksComponent,
    MyAccountComponent,
    ApplyAuthorityComponent,
    RecoverAuthorityComponent,
    SeeMoreComponent,
    TaaComponent,
    Vast2Component,
    SheperdComponent,
    AmazonKinesisVideoStreamsComponent,
    IntelligentVCAComponent,
    NDAAComponent,
    SitemapComponent,
    OnlineTrainingStepComponent,
    ECommerceComponent,
    ProjectRegistrationComponent,
    KnowAboutCybersecurityComponent,
    SortwareDownloadComponent
  ]
})
export class HomeModule { }
