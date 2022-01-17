import { InvestorsServiceCategoryContentComponent } from './investors/service/categories/investors-service-category-content/investors-service-category-content.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SortablejsModule } from 'angular-sortablejs';
import { MomentModule } from 'ngx-moment';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';
import { VvtkPipeModule } from '../shared/pipes/vvtk-pipe.module';
import { SharedModule } from '../shared/shared.module';
import { ToolsService } from '../vvtk-core/services/tools.service';
import { VvtkService } from '../vvtk-core/services/vvtk.service';
import { AboutOverviewComponent } from './about/about-overview/about-overview.component';
import { AboutSocialComponent } from './about/about-social/about-social.component';
import { AboutAwardContentComponent } from './about/awards/about-award-content/about-award-content.component';
import { AboutAwardsListComponent } from './about/awards/about-awards-list/about-awards-list.component';
import { AboutCommunityContentComponent } from './about/community/about-community-content/about-community-content.component';
import { AboutCommunityListComponent } from './about/community/about-community-list/about-community-list.component';
import { AboutCSRActivitiesListComponent } from './about/csractivities/about-csractivities-list/about-csractivities-list.component';
import { AboutCSRActivityContentComponent } from './about/csractivities/about-csractivity-content/about-csractivity-content.component';
// tslint:disable-next-line:max-line-length
import { AboutGreenCategoriesListComponent } from './about/green/categories/about-green-categories-list/about-green-categories-list.component';
// tslint:disable-next-line:max-line-length
import { AboutGreenCategoryContentComponent } from './about/green/categories/about-green-category-content/about-green-category-content.component';
import { AboutGreenPageContentComponent } from './about/green/pages/about-green-page-content/about-green-page-content.component';
import { AboutGreenPagesListComponent } from './about/green/pages/about-green-pages-list/about-green-pages-list.component';
import { AboutMilestoneContentComponent } from './about/milestones/about-milestone-content/about-milestone-content.component';
import { AboutMilestonesListComponent } from './about/milestones/about-milestones-list/about-milestones-list.component';
import { AboutRelatedLinksComponent } from './about/about-relatedlinks/about-relatedlinks.component';
import { AccountContentComponent } from './accounts/account-content/account-content.component';
import { AccountsListComponent } from './accounts/accounts-list/accounts-list.component';
import { MaintainModulesComponent } from './admin/maintain-modules/maintain-modules.component';
import { BuyHowComponent } from './buy/buy-how/buy-how.component';
import { BuyTagsEditorComponent } from './buy/buy-tags/buy-tags-editor/buy-tags-editor.component';
import { BuyTagsComponent } from './buy/buy-tags/buy-tags.component';
import { BuyWhereContentComponent } from './buy/buy-where-content/buy-where-content.component';
import { BuyWhereListComponent } from './buy/buy-where-list/buy-where-list.component';
import { CampaignContentComponent } from './campaigns/campaign-content/campaign-content.component';
import { CampaignParticipantsComponent } from './campaigns/campaign-participants/campaign-participants.component';
import { CampaignsListComponent } from './campaigns/campaigns-list/campaigns-list.component';
import { CareersBccComponent } from './careers/careers-bcc/careers-bcc.component';
import { CareersWorkingComponent } from './careers/careers-working/careers-working.component';
import { CareersResumeContentComponent } from './careers/resume/careers-resume-content/careers-resume-content.component';
import { CareersResumeListComponent } from './careers/resume/careers-resume-list/careers-resume-list.component';
import { CareersVacanciesListComponent } from './careers/vacancies/careers-vacancies-list/careers-vacancies-list.component';
import { CareersVacancyContentComponent } from './careers/vacancies/careers-vacancy-content/careers-vacancy-content.component';
import { CaseContentComponent } from './cases/case-content/case-content.component';
import { CasesListComponent } from './cases/cases-list/cases-list.component';
import { ContactContentComponent } from './contact/contact-content/contact-content.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
// tslint:disable-next-line:max-line-length
import { ContactOfficeBranchContentComponent } from './contact/office/contact-office-branch-content/contact-office-branch-content.component';
import { ContactOfficeBranchListComponent } from './contact/office/contact-office-branch-list/contact-office-branch-list.component';
import { ContactOfficeHeadquartersComponent } from './contact/office/contact-office-headquarters/contact-office-headquarters.component';
import { ContactSubjectContentComponent } from './contact/subjects/contact-subject-content/contact-subject-content.component';
import { ContactSubjectsListComponent } from './contact/subjects/contact-subjects-list/contact-subjects-list.component';
import { CountryContinentEditorComponent } from './country/country-continent-editor/country-continent-editor.component';
import { CountryCountryEditorComponent } from './country/country-country-editor/country-country-editor.component';
import { CountryStateEditorComponent } from './country/country-state-editor/country-state-editor.component';
import { CountryComponent } from './country/country.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClipboardDirective } from './directives/clipboard.directive';
import { EventContentComponent } from './events/event-content/event-content.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { FileEditorComponent } from './files/file-editor/file-editor.component';
import { FilesComponent } from './files/files.component';
import { ForbiddenComponent } from './home/forbidden/forbidden.component';
import { HomeSectionContentComponent } from './home/sections/home-section-content/home-section-content.component';
import { HomeSectionsListComponent } from './home/sections/home-sections-list/home-sections-list.component';
import { HomeSliderContentComponent } from './home/sliders/home-slider-content/home-slider-content.component';
import { HomeSlidersListComponent } from './home/sliders/home-sliders-list/home-sliders-list.component';
import { HomeSubscriptionsComponent } from './home/subscriptions/home-subscriptions.component';
// tslint:disable-next-line:max-line-length
import { InvestorsFinanceMonthContentComponent } from './investors/finance/month/investors-finance-month-content/investors-finance-month-content.component';
import { InvestorsFinanceMonthComponent } from './investors/finance/month/investors-finance-month/investors-finance-month.component';
// tslint:disable-next-line:max-line-length
import { InvestorsFinanceQuarterlyConsolidatedContentComponent } from './investors/finance/quarterly/investors-finance-quarterly-consolidated-content/investors-finance-quarterly-consolidated-content.component';
// tslint:disable-next-line:max-line-length
import { InvestorsFinanceQuarterlyConsolidatedComponent } from './investors/finance/quarterly/investors-finance-quarterly-consolidated/investors-finance-quarterly-consolidated.component';
// tslint:disable-next-line:max-line-length
import { InvestorsFinanceQuarterlySingleContentComponent } from './investors/finance/quarterly/investors-finance-quarterly-single-content/investors-finance-quarterly-single-content.component';
// tslint:disable-next-line:max-line-length
import { InvestorsFinanceQuarterlySingleComponent } from './investors/finance/quarterly/investors-finance-quarterly-single/investors-finance-quarterly-single.component';
// tslint:disable-next-line:max-line-length
import { InvestorsArchitectureContentComponent } from './investors/investors-architecture/investors-architecture-content/investors-architecture-content.component';
import { InvestorsArchitectureComponent } from './investors/investors-architecture/investors-architecture.component';
// tslint:disable-next-line:max-line-length
import { InvestorsCommitteeContentComponent } from './investors/investors-committee/investors-committee-content/investors-committee-content.component';
import { InvestorsCommitteeComponent } from './investors/investors-committee/investors-committee.component';
import { InvestorsCorporateComponent } from './investors/investors-corporate/investors-corporate.component';
// tslint:disable-next-line:max-line-length
import { InvestorsDirectorContentComponent } from './investors/investors-director/investors-director-content/investors-director-content.component';
import { InvestorsDirectorComponent } from './investors/investors-director/investors-director.component';
import { InvestorsManageComponent } from './investors/investors-manage/investors-manage.component';
import { InvestorsOperationComponent } from './investors/investors-operation/investors-operation.component';
import { InvestorsRegulationsComponent } from './investors/investors-regulations/investors-regulations.component';
// tslint:disable-next-line:max-line-length
import { InvestorsShareholderContentComponent } from './investors/investors-shareholder/investors-shareholder-content/investors-shareholder-content.component';
import { InvestorsShareholderComponent } from './investors/investors-shareholder/investors-shareholder.component';
// tslint:disable-next-line:max-line-length
import { InvestorsPresentationContentComponent } from './investors/presentation/investors-presentation-content/investors-presentation-content.component';
// tslint:disable-next-line:max-line-length
import { InvestorsPresentationLinkContentComponent } from './investors/presentation/investors-presentation-link-content/investors-presentation-link-content.component';
// tslint:disable-next-line:max-line-length
import { InvestorsPresentationLinksListComponent } from './investors/presentation/investors-presentation-links-list/investors-presentation-links-list.component';
// tslint:disable-next-line:max-line-length
import { InvestorsShareholderDividendComponent } from './investors/shareholder/investors-shareholder-dividend/investors-shareholder-dividend.component';
// tslint:disable-next-line:max-line-length
import { InvestorsShareholderShareholderComponent } from './investors/shareholder/investors-shareholder-shareholder/investors-shareholder-shareholder.component';
// tslint:disable-next-line:max-line-length
import { InvestorsShareholderShareholdingComponent } from './investors/shareholder/investors-shareholder-shareholding/investors-shareholder-shareholding.component';
// tslint:disable-next-line:max-line-length
import { InvestorsStakeholderFaqCategoryEditorComponent } from './investors/stakeholder/faq/investors-stakeholder-faq-category-editor/investors-stakeholder-faq-category-editor.component';
// tslint:disable-next-line:max-line-length
import { InvestorsStakeholderFaqCategoryComponent } from './investors/stakeholder/faq/investors-stakeholder-faq-category/investors-stakeholder-faq-category.component';
// tslint:disable-next-line:max-line-length
import { InvestorsStakeholderFaqContentComponent } from './investors/stakeholder/faq/investors-stakeholder-faq-content/investors-stakeholder-faq-content.component';
// tslint:disable-next-line:max-line-length
import { InvestorsStakeholderFaqListComponent } from './investors/stakeholder/faq/investors-stakeholder-faq-list/investors-stakeholder-faq-list.component';
import { LoginComponent } from './login/login.component';
import { NewsContentComponent } from './news/news-content/news-content.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { NewsTagsEditorComponent } from './news/news-tags/news-tags-editor/news-tags-editor.component';
import { NewsTagsComponent } from './news/news-tags/news-tags.component';
import { PageContentComponent } from './page/page-content/page-content.component';
import { PageListComponent } from './page/page-list/page-list.component';
import { PageService } from './page/page.service';
import { RoleContentComponent } from './roles/role-content/role-content.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { RuleIntellectualComponent } from './rule/rule-intellectual/rule-intellectual.component';
import { RuleLegalComponent } from './rule/rule-legal/rule-legal.component';
import { RulePartnerComponent } from './rule/rule-partner/rule-partner.component';
import { RulePrivacyComponent } from './rule/rule-privacy/rule-privacy.component';
import { RuleTermsComponent } from './rule/rule-terms/rule-terms.component';
import { RuleTrademarksComponent } from './rule/rule-trademarks/rule-trademarks.component';
import { RuleComponent } from './rule/rule/rule.component';
import { SitemapEditorComponent } from './sitemap/sitemap-editor/sitemap-editor.component';
import { SitemapFooterComponent } from './sitemap/sitemap-footer/sitemap-footer.component';
import { SitemapHeaderComponent } from './sitemap/sitemap-header/sitemap-header.component';
import { TestPageComponent } from './test-page/test-page.component';
import { CoverageContentComponent } from './coverage/coverage-content/coverage-content.component';
import { CoverageListComponent } from './coverage/coverage-list/coverage-list.component';
import { DeleteConfirmComponent } from '../shared/components/delete-confirm/delete-confirm.component';
import { SubmitReviewComponent } from '../shared/components/submit-review/submit-review.component';
import { ReviewDialogComponent } from '../shared/components/review-dialog/review-dialog.component';
import { CdnComponent } from './cdn/cdn.component';
import { AboutCSRCategoriesListComponent } from './about/csr/categories/about-csr-categories-list/about-csr-categories-list.component';
import { AboutCSRCategoryContentComponent } from './about/csr/categories/about-csr-category-content/about-csr-category-content.component';
import { AboutCSRPagesListComponent } from './about/csr/pages/about-csr-pages-list/about-csr-pages-list.component';
import { AboutCSRPageContentComponent } from './about/csr/pages/about-csr-page-content/about-csr-page-content.component';
import { InvestorsServiceCategoriesListComponent } from './investors/service/categories/investors-service-categories-list/investors-service-categories-list.component';
import { InvestorsServicePagesListComponent } from './investors/service/pages/investors-service-pages-list/investors-service-pages-list.component';
import { InvestorsServicePageContentComponent } from './investors/service/pages/investors-service-page-content/investors-service-page-content.component';
import { LearningAndDevelopmentComponent } from './careers/learning-and-development/learning-and-development.component';
import { CompensationAndBenefitComponent } from './careers/compensation-and-benefit/compensation-and-benefit.component';
import { EmploymentRelationshipComponent } from './careers/employment-relationship/employment-relationship.component';
import { AboutOurBrandComponent } from './about/about-our-brand/about-our-brand.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MomentModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SharedModule,
    VvtkPipeModule,
    PerfectScrollbarModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    SortablejsModule
  ],
  entryComponents: [
    ConfirmComponent,
    DeleteConfirmComponent,
    SubmitReviewComponent,
    NewsTagsEditorComponent,
    BuyTagsEditorComponent,
    CampaignParticipantsComponent,
    ReviewDialogComponent,
  ],
  declarations: [
    ClipboardDirective,
    LoginComponent,
    DashboardComponent,
    NewsTagsComponent,
    NewsListComponent,
    NewsContentComponent,
    NewsTagsEditorComponent,
    HomeSubscriptionsComponent,
    FilesComponent,
    CampaignsListComponent,
    CampaignContentComponent,
    CampaignParticipantsComponent,
    HomeSectionsListComponent,
    HomeSectionContentComponent,
    CountryComponent,
    CountryContinentEditorComponent,
    CountryCountryEditorComponent,
    CountryStateEditorComponent,
    BuyTagsComponent,
    BuyTagsEditorComponent,
    BuyWhereListComponent,
    BuyWhereContentComponent,
    FileEditorComponent,
    SitemapFooterComponent,
    SitemapHeaderComponent,
    SitemapEditorComponent,
    CasesListComponent,
    CaseContentComponent,
    MaintainModulesComponent,
    InvestorsManageComponent,
    ForbiddenComponent,
    InvestorsDirectorComponent,
    InvestorsDirectorContentComponent,
    InvestorsArchitectureComponent,
    InvestorsArchitectureContentComponent,
    InvestorsOperationComponent,
    InvestorsRegulationsComponent,
    InvestorsCorporateComponent,
    AboutOverviewComponent,
    AboutSocialComponent,
    InvestorsCommitteeComponent,
    InvestorsCommitteeContentComponent,
    InvestorsShareholderComponent,
    InvestorsShareholderContentComponent,
    EventContentComponent,
    EventsListComponent,
    HomeSlidersListComponent,
    HomeSliderContentComponent,
    InvestorsFinanceMonthComponent,
    InvestorsFinanceMonthContentComponent,
    InvestorsFinanceQuarterlySingleComponent,
    InvestorsFinanceQuarterlySingleContentComponent,
    InvestorsFinanceQuarterlyConsolidatedComponent,
    InvestorsFinanceQuarterlyConsolidatedContentComponent,
    InvestorsStakeholderFaqCategoryComponent,
    InvestorsStakeholderFaqCategoryEditorComponent,
    InvestorsStakeholderFaqListComponent,
    InvestorsStakeholderFaqContentComponent,
    ContactSubjectsListComponent,
    ContactSubjectContentComponent,
    ContactContentComponent,
    ContactListComponent,
    TestPageComponent,
    CareersWorkingComponent,
    CareersBccComponent,
    CareersVacanciesListComponent,
    CareersResumeListComponent,
    CareersResumeContentComponent,
    CareersVacancyContentComponent,
    LearningAndDevelopmentComponent,
    CompensationAndBenefitComponent,
    EmploymentRelationshipComponent,
    PageListComponent,
    PageContentComponent,
    AboutCommunityListComponent,
    AboutCommunityContentComponent,
    BuyHowComponent,
    InvestorsShareholderShareholderComponent,
    InvestorsShareholderDividendComponent,
    InvestorsShareholderShareholdingComponent,
    InvestorsPresentationContentComponent,
    InvestorsPresentationLinksListComponent,
    InvestorsPresentationLinkContentComponent,
    InvestorsServiceCategoriesListComponent,
    InvestorsServiceCategoryContentComponent,
    InvestorsServicePagesListComponent,
    InvestorsServicePageContentComponent,
    ContactOfficeHeadquartersComponent,
    ContactOfficeBranchListComponent,
    ContactOfficeBranchContentComponent,
    RuleComponent,
    RuleTrademarksComponent,
    RuleIntellectualComponent,
    RuleLegalComponent,
    RulePrivacyComponent,
    RuleTermsComponent,
    AccountsListComponent,
    AccountContentComponent,
    RolesListComponent,
    RoleContentComponent,
    RulePartnerComponent,
    AboutAwardsListComponent,
    AboutAwardContentComponent,
    AboutMilestoneContentComponent,
    AboutMilestonesListComponent,
    AboutCSRActivitiesListComponent,
    AboutCSRActivityContentComponent,
    AboutGreenCategoriesListComponent,
    AboutGreenCategoryContentComponent,
    AboutGreenPagesListComponent,
    AboutGreenPageContentComponent,
    AboutCSRCategoriesListComponent,
    AboutCSRCategoryContentComponent,
    AboutCSRPagesListComponent,
    AboutCSRPageContentComponent,
    AboutRelatedLinksComponent,
    AboutOurBrandComponent,
    CoverageContentComponent,
    CoverageListComponent,
    CdnComponent
  ],
  providers: [ToolsService, VvtkService, PageService]
})
export class PagesModule { }
