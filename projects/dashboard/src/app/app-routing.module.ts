import { InvestorsServiceCategoryContentComponent } from './pages/investors/service/categories/investors-service-category-content/investors-service-category-content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AboutOverviewComponent } from './pages/about/about-overview/about-overview.component';
import { AboutSocialComponent } from './pages/about/about-social/about-social.component';
import { AboutAwardContentComponent } from './pages/about/awards/about-award-content/about-award-content.component';
import { AboutAwardsListComponent } from './pages/about/awards/about-awards-list/about-awards-list.component';
import { AboutCommunityContentComponent } from './pages/about/community/about-community-content/about-community-content.component';
import { AboutCommunityListComponent } from './pages/about/community/about-community-list/about-community-list.component';
import { AboutCSRActivitiesListComponent } from './pages/about/csractivities/about-csractivities-list/about-csractivities-list.component';
// tslint:disable-next-line:max-line-length
import { AboutCSRActivityContentComponent } from './pages/about/csractivities/about-csractivity-content/about-csractivity-content.component';
// tslint:disable-next-line:max-line-length
import { AboutGreenCategoriesListComponent } from './pages/about/green/categories/about-green-categories-list/about-green-categories-list.component';
// tslint:disable-next-line:max-line-length
import { AboutGreenCategoryContentComponent } from './pages/about/green/categories/about-green-category-content/about-green-category-content.component';
import { AboutGreenPageContentComponent } from './pages/about/green/pages/about-green-page-content/about-green-page-content.component';
import { AboutGreenPagesListComponent } from './pages/about/green/pages/about-green-pages-list/about-green-pages-list.component';
import { AboutMilestoneContentComponent } from './pages/about/milestones/about-milestone-content/about-milestone-content.component';
import { AboutMilestonesListComponent } from './pages/about/milestones/about-milestones-list/about-milestones-list.component';
import { AboutRelatedLinksComponent } from './pages/about/about-relatedlinks/about-relatedlinks.component';
import { AccountContentComponent } from './pages/accounts/account-content/account-content.component';
import { AccountsListComponent } from './pages/accounts/accounts-list/accounts-list.component';
import { MaintainModulesComponent } from './pages/admin/maintain-modules/maintain-modules.component';
import { BuyHowComponent } from './pages/buy/buy-how/buy-how.component';
import { BuyTagsComponent } from './pages/buy/buy-tags/buy-tags.component';
import { BuyWhereContentComponent } from './pages/buy/buy-where-content/buy-where-content.component';
import { BuyWhereListComponent } from './pages/buy/buy-where-list/buy-where-list.component';
import { CampaignContentComponent } from './pages/campaigns/campaign-content/campaign-content.component';
import { CampaignsListComponent } from './pages/campaigns/campaigns-list/campaigns-list.component';
import { CareersBccComponent } from './pages/careers/careers-bcc/careers-bcc.component';
import { CareersWorkingComponent } from './pages/careers/careers-working/careers-working.component';
import { CareersResumeContentComponent } from './pages/careers/resume/careers-resume-content/careers-resume-content.component';
import { CareersResumeListComponent } from './pages/careers/resume/careers-resume-list/careers-resume-list.component';
import { CareersVacanciesListComponent } from './pages/careers/vacancies/careers-vacancies-list/careers-vacancies-list.component';
import { CareersVacancyContentComponent } from './pages/careers/vacancies/careers-vacancy-content/careers-vacancy-content.component';
import { CaseContentComponent } from './pages/cases/case-content/case-content.component';
import { CasesListComponent } from './pages/cases/cases-list/cases-list.component';
import { ContactContentComponent } from './pages/contact/contact-content/contact-content.component';
import { ContactListComponent } from './pages/contact/contact-list/contact-list.component';
// tslint:disable-next-line:max-line-length
import { ContactOfficeBranchContentComponent } from './pages/contact/office/contact-office-branch-content/contact-office-branch-content.component';
import { ContactOfficeBranchListComponent } from './pages/contact/office/contact-office-branch-list/contact-office-branch-list.component';
// tslint:disable-next-line:max-line-length
import { ContactOfficeHeadquartersComponent } from './pages/contact/office/contact-office-headquarters/contact-office-headquarters.component';
import { ContactSubjectContentComponent } from './pages/contact/subjects/contact-subject-content/contact-subject-content.component';
import { ContactSubjectsListComponent } from './pages/contact/subjects/contact-subjects-list/contact-subjects-list.component';
import { CountryComponent } from './pages/country/country.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventContentComponent } from './pages/events/event-content/event-content.component';
import { EventsListComponent } from './pages/events/events-list/events-list.component';
import { FilesComponent } from './pages/files/files.component';
import { ForbiddenComponent } from './pages/home/forbidden/forbidden.component';
import { HomeSectionContentComponent } from './pages/home/sections/home-section-content/home-section-content.component';
import { HomeSectionsListComponent } from './pages/home/sections/home-sections-list/home-sections-list.component';
import { HomeSliderContentComponent } from './pages/home/sliders/home-slider-content/home-slider-content.component';
import { HomeSlidersListComponent } from './pages/home/sliders/home-sliders-list/home-sliders-list.component';
import { HomeSubscriptionsComponent } from './pages/home/subscriptions/home-subscriptions.component';
// tslint:disable-next-line:max-line-length
import { InvestorsFinanceMonthContentComponent } from './pages/investors/finance/month/investors-finance-month-content/investors-finance-month-content.component';
import { InvestorsFinanceMonthComponent } from './pages/investors/finance/month/investors-finance-month/investors-finance-month.component';
// tslint:disable-next-line:max-line-length
import { InvestorsFinanceQuarterlyConsolidatedContentComponent } from './pages/investors/finance/quarterly/investors-finance-quarterly-consolidated-content/investors-finance-quarterly-consolidated-content.component';
// tslint:disable-next-line:max-line-length
import { InvestorsFinanceQuarterlyConsolidatedComponent } from './pages/investors/finance/quarterly/investors-finance-quarterly-consolidated/investors-finance-quarterly-consolidated.component';
// tslint:disable-next-line:max-line-length
import { InvestorsFinanceQuarterlySingleContentComponent } from './pages/investors/finance/quarterly/investors-finance-quarterly-single-content/investors-finance-quarterly-single-content.component';
// tslint:disable-next-line:max-line-length
import { InvestorsFinanceQuarterlySingleComponent } from './pages/investors/finance/quarterly/investors-finance-quarterly-single/investors-finance-quarterly-single.component';
// tslint:disable-next-line:max-line-length
import { InvestorsArchitectureContentComponent } from './pages/investors/investors-architecture/investors-architecture-content/investors-architecture-content.component';
import { InvestorsArchitectureComponent } from './pages/investors/investors-architecture/investors-architecture.component';
// tslint:disable-next-line:max-line-length
import { InvestorsCommitteeContentComponent } from './pages/investors/investors-committee/investors-committee-content/investors-committee-content.component';
import { InvestorsCommitteeComponent } from './pages/investors/investors-committee/investors-committee.component';
import { InvestorsCorporateComponent } from './pages/investors/investors-corporate/investors-corporate.component';
// tslint:disable-next-line:max-line-length
import { InvestorsDirectorContentComponent } from './pages/investors/investors-director/investors-director-content/investors-director-content.component';
import { InvestorsDirectorComponent } from './pages/investors/investors-director/investors-director.component';
import { InvestorsManageComponent } from './pages/investors/investors-manage/investors-manage.component';
import { InvestorsOperationComponent } from './pages/investors/investors-operation/investors-operation.component';
import { InvestorsRegulationsComponent } from './pages/investors/investors-regulations/investors-regulations.component';
// tslint:disable-next-line:max-line-length
import { InvestorsShareholderContentComponent } from './pages/investors/investors-shareholder/investors-shareholder-content/investors-shareholder-content.component';
import { InvestorsShareholderComponent } from './pages/investors/investors-shareholder/investors-shareholder.component';
// tslint:disable-next-line:max-line-length
import { InvestorsPresentationContentComponent } from './pages/investors/presentation/investors-presentation-content/investors-presentation-content.component';
// tslint:disable-next-line:max-line-length
import { InvestorsPresentationLinkContentComponent } from './pages/investors/presentation/investors-presentation-link-content/investors-presentation-link-content.component';
// tslint:disable-next-line:max-line-length
import { InvestorsPresentationLinksListComponent } from './pages/investors/presentation/investors-presentation-links-list/investors-presentation-links-list.component';
// tslint:disable-next-line:max-line-length
import { InvestorsShareholderDividendComponent } from './pages/investors/shareholder/investors-shareholder-dividend/investors-shareholder-dividend.component';
// tslint:disable-next-line:max-line-length
import { InvestorsShareholderShareholderComponent } from './pages/investors/shareholder/investors-shareholder-shareholder/investors-shareholder-shareholder.component';
// tslint:disable-next-line:max-line-length
import { InvestorsShareholderShareholdingComponent } from './pages/investors/shareholder/investors-shareholder-shareholding/investors-shareholder-shareholding.component';
// tslint:disable-next-line:max-line-length
import { InvestorsStakeholderFaqCategoryComponent } from './pages/investors/stakeholder/faq/investors-stakeholder-faq-category/investors-stakeholder-faq-category.component';
// tslint:disable-next-line:max-line-length
import { InvestorsStakeholderFaqContentComponent } from './pages/investors/stakeholder/faq/investors-stakeholder-faq-content/investors-stakeholder-faq-content.component';
// tslint:disable-next-line:max-line-length
import { InvestorsStakeholderFaqListComponent } from './pages/investors/stakeholder/faq/investors-stakeholder-faq-list/investors-stakeholder-faq-list.component';
import { LoginComponent } from './pages/login/login.component';
import { NewsContentComponent } from './pages/news/news-content/news-content.component';
import { NewsListComponent } from './pages/news/news-list/news-list.component';
import { NewsTagsComponent } from './pages/news/news-tags/news-tags.component';
import { PageContentComponent } from './pages/page/page-content/page-content.component';
import { PageListComponent } from './pages/page/page-list/page-list.component';
import { RoleContentComponent } from './pages/roles/role-content/role-content.component';
import { RolesListComponent } from './pages/roles/roles-list/roles-list.component';
import { RuleIntellectualComponent } from './pages/rule/rule-intellectual/rule-intellectual.component';
import { RuleLegalComponent } from './pages/rule/rule-legal/rule-legal.component';
import { RulePartnerComponent } from './pages/rule/rule-partner/rule-partner.component';
import { RulePrivacyComponent } from './pages/rule/rule-privacy/rule-privacy.component';
import { RuleTermsComponent } from './pages/rule/rule-terms/rule-terms.component';
import { RuleTrademarksComponent } from './pages/rule/rule-trademarks/rule-trademarks.component';
import { SitemapFooterComponent } from './pages/sitemap/sitemap-footer/sitemap-footer.component';
import { SitemapHeaderComponent } from './pages/sitemap/sitemap-header/sitemap-header.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { AuthGuard, LoginGuard } from './vvtk-core/services/auth.service';
import { CoverageListComponent } from './pages/coverage/coverage-list/coverage-list.component';
import { CoverageContentComponent } from './pages/coverage/coverage-content/coverage-content.component';
import { CdnComponent } from './pages/cdn/cdn.component';
import { AboutCSRPageContentComponent } from './pages/about/csr/pages/about-csr-page-content/about-csr-page-content.component';
import { AboutCSRPagesListComponent } from './pages/about/csr/pages/about-csr-pages-list/about-csr-pages-list.component';
// tslint:disable-next-line: max-line-length
import { AboutCSRCategoryContentComponent } from './pages/about/csr/categories/about-csr-category-content/about-csr-category-content.component';
// tslint:disable-next-line: max-line-length
import { AboutCSRCategoriesListComponent } from './pages/about/csr/categories/about-csr-categories-list/about-csr-categories-list.component';
import { InvestorsServicePageContentComponent } from './pages/investors/service/pages/investors-service-page-content/investors-service-page-content.component';
import { InvestorsServicePagesListComponent } from './pages/investors/service/pages/investors-service-pages-list/investors-service-pages-list.component';
import { InvestorsServiceCategoriesListComponent } from './pages/investors/service/categories/investors-service-categories-list/investors-service-categories-list.component';
import { CompensationAndBenefitComponent } from './pages/careers/compensation-and-benefit/compensation-and-benefit.component';
import { LearningAndDevelopmentComponent } from './pages/careers/learning-and-development/learning-and-development.component';
import { EmploymentRelationshipComponent } from './pages/careers/employment-relationship/employment-relationship.component';
import { AboutOurBrandComponent } from './pages/about/about-our-brand/about-our-brand.component';

const routes: Routes = [
  {
    path: 'test',
    component: TestPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forbidden',
    component: AdminComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: ForbiddenComponent
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'about/green/page/content/:id',
        component: AboutGreenPageContentComponent
      },
      {
        path: 'about/green/pages/list',
        component: AboutGreenPagesListComponent
      },
      {
        path: 'about/green/category/content/:id',
        component: AboutGreenCategoryContentComponent
      },
      {
        path: 'about/green/categories/list',
        component: AboutGreenCategoriesListComponent
      },
      {
        path: 'about/csr/page/content/:id',
        component: AboutCSRPageContentComponent
      },
      {
        path: 'about/csr/pages/list',
        component: AboutCSRPagesListComponent
      },
      {
        path: 'about/csr/category/content/:id',
        component: AboutCSRCategoryContentComponent
      },
      {
        path: 'about/csr/categories/list',
        component: AboutCSRCategoriesListComponent
      },
      {
        path: 'about/csractivity/content/:id',
        component: AboutCSRActivityContentComponent
      },
      {
        path: 'about/csractivities/list',
        component: AboutCSRActivitiesListComponent
      },
      {
        path: 'about/milestone/content/:id',
        component: AboutMilestoneContentComponent
      },
      {
        path: 'about/milestones/list',
        component: AboutMilestonesListComponent
      },
      {
        path: 'about/award/content/:id',
        component: AboutAwardContentComponent
      },
      {
        path: 'about/awards/list',
        component: AboutAwardsListComponent
      },
      {
        path: 'about/who-we-are/related-links',
        component: AboutRelatedLinksComponent
      },
      {
        path: 'about/who-we-are/our-brand',
        component: AboutOurBrandComponent
      },
      {
        path: 'role/content/:id',
        component: RoleContentComponent
      },
      {
        path: 'roles/list',
        component: RolesListComponent
      },
      {
        path: 'account/content/:id',
        component: AccountContentComponent
      },
      {
        path: 'accounts/list',
        component: AccountsListComponent
      },
      {
        path: 'rule/partner',
        component: RulePartnerComponent
      },
      {
        path: 'rule/trademarks',
        component: RuleTrademarksComponent
      },
      {
        path: 'rule/legal',
        component: RuleLegalComponent
      },
      {
        path: 'rule/privacy',
        component: RulePrivacyComponent
      },
      {
        path: 'rule/intellectual',
        component: RuleIntellectualComponent
      },
      {
        path: 'rule/terms',
        component: RuleTermsComponent
      },
      {
        path: 'contact/offices/branch/content/:id',
        component: ContactOfficeBranchContentComponent
      },
      {
        path: 'contact/offices/branch/list',
        component: ContactOfficeBranchListComponent
      },
      {
        path: 'contact/offices/headquarters',
        component: ContactOfficeHeadquartersComponent
      },
      {
        path: 'investors/presentation/link/content/:id',
        component: InvestorsPresentationLinkContentComponent
      },
      {
        path: 'investors/presentation/links/list',
        component: InvestorsPresentationLinksListComponent
      },
      {
        path: 'investors/presentation/content',
        component: InvestorsPresentationContentComponent
      },
      {
        path: 'investors/shareholder/shareholding',
        component: InvestorsShareholderShareholdingComponent
      },
      {
        path: 'investors/shareholder/dividend',
        component: InvestorsShareholderDividendComponent
      },
      {
        path: 'investors/shareholder/shareholder',
        component: InvestorsShareholderShareholderComponent
      },
      {
        path: 'investors/service/page/content/:id',
        component: InvestorsServicePageContentComponent
      },
      {
        path: 'investors/service/pages/list',
        component: InvestorsServicePagesListComponent
      },
      {
        path: 'investors/service/category/content/:id',
        component: InvestorsServiceCategoryContentComponent
      },
      {
        path: 'investors/service/categories/list',
        component: InvestorsServiceCategoriesListComponent
      },
      {
        path: 'buy/how',
        component: BuyHowComponent
      },
      {
        path: 'about/community/content/:id',
        component: AboutCommunityContentComponent
      },
      {
        path: 'about/community/list',
        component: AboutCommunityListComponent
      },
      {
        path: 'page/content',
        component: PageContentComponent
      },
      {
        path: 'page/list',
        component: PageListComponent
      },
      {
        path: 'careers/resume/content/:id',
        component: CareersResumeContentComponent
      },
      {
        path: 'careers/resume/list',
        component: CareersResumeListComponent
      },
      {
        path: 'careers/vacancy/content/:id',
        component: CareersVacancyContentComponent
      },
      {
        path: 'careers/vacancies/list',
        component: CareersVacanciesListComponent
      },
      {
        path: 'careers/bcc',
        component: CareersBccComponent
      },
      {
        path: 'careers/working',
        component: CareersWorkingComponent
      },
      {
        path: 'careers/learning-and-development',
        component: LearningAndDevelopmentComponent
      },
      {
        path: 'careers/compensation-and-benefit',
        component: CompensationAndBenefitComponent
      },
      {
        path: 'careers/employment-relationship',
        component: EmploymentRelationshipComponent
      },
      {
        path: 'contact/subjects/list',
        component: ContactSubjectsListComponent
      },
      {
        path: 'contact/subject/content/:id',
        component: ContactSubjectContentComponent
      },
      {
        path: 'contact/list',
        component: ContactListComponent
      },
      {
        path: 'contact/content/:id',
        component: ContactContentComponent
      },
      {
        path: 'about/overview',
        component: AboutOverviewComponent
      },
      {
        path: 'about/social',
        component: AboutSocialComponent
      },
      {
        path: 'investors/stakeholder/faq/list',
        component: InvestorsStakeholderFaqListComponent
      },
      {
        path: 'investors/stakeholder/faq/content/:id',
        component: InvestorsStakeholderFaqContentComponent
      },
      {
        path: 'investors/stakeholder/faq/category',
        component: InvestorsStakeholderFaqCategoryComponent
      },
      {
        path:
          'investors/finance/quarterly/consolidated/:year/:quarterly/content/:type',
        component: InvestorsFinanceQuarterlyConsolidatedContentComponent
      },
      {
        path: 'investors/finance/quarterly/consolidated',
        component: InvestorsFinanceQuarterlyConsolidatedComponent
      },
      {
        path:
          'investors/finance/quarterly/single/:year/:quarterly/content/:type',
        component: InvestorsFinanceQuarterlySingleContentComponent
      },
      {
        path: 'investors/finance/quarterly/single',
        component: InvestorsFinanceQuarterlySingleComponent
      },

      {
        path: 'investors/finance/month/:year/content/:type',
        component: InvestorsFinanceMonthContentComponent
      },
      {
        path: 'investors/finance/month',
        component: InvestorsFinanceMonthComponent
      },
      {
        path: 'investors/corporate',
        component: InvestorsCorporateComponent
      },
      {
        path: 'investors/regulations',
        component: InvestorsRegulationsComponent
      },
      {
        path: 'investors/operation',
        component: InvestorsOperationComponent
      },
      {
        path: 'investors/shareholder/content/:type',
        component: InvestorsShareholderContentComponent
      },
      {
        path: 'investors/shareholder',
        component: InvestorsShareholderComponent
      },
      {
        path: 'investors/committee/content/:type',
        component: InvestorsCommitteeContentComponent
      },
      {
        path: 'investors/committee',
        component: InvestorsCommitteeComponent
      },
      {
        path: 'investors/architecture/content/:type',
        component: InvestorsArchitectureContentComponent
      },
      {
        path: 'investors/architecture',
        component: InvestorsArchitectureComponent
      },
      {
        path: 'investors/director/content/:type',
        component: InvestorsDirectorContentComponent
      },
      {
        path: 'investors/director',
        component: InvestorsDirectorComponent
      },
      {
        path: 'investors/manage',
        component: InvestorsManageComponent
      },
      {
        path: 'sitemap/footer',
        component: SitemapFooterComponent
      },
      {
        path: 'sitemap/header',
        component: SitemapHeaderComponent
      },
      {
        path: 'buy/where/list',
        component: BuyWhereListComponent
      },
      {
        path: 'buy/where/content/:id',
        component: BuyWhereContentComponent
      },
      {
        path: 'buy/tags',
        component: BuyTagsComponent
      },
      {
        path: 'country',
        component: CountryComponent
      },
      {
        path: 'home/slider/content/:id',
        component: HomeSliderContentComponent
      },
      {
        path: 'home/sliders/list',
        component: HomeSlidersListComponent
      },
      {
        path: 'home/section/content/:id',
        component: HomeSectionContentComponent
      },
      {
        path: 'home/sections/list',
        component: HomeSectionsListComponent
      },
      {
        path: 'case/content/:id',
        component: CaseContentComponent
      },
      {
        path: 'cases/list',
        component: CasesListComponent
      },
      {
        path: 'event/content/:id',
        component: EventContentComponent
      },
      {
        path: 'events/list',
        component: EventsListComponent
      },
      {
        path: 'campaign/content/:id',
        component: CampaignContentComponent
      },
      {
        path: 'campaigns/list',
        component: CampaignsListComponent
      },
      {
        path: 'news/content/:id',
        component: NewsContentComponent
      },
      {
        path: 'news/list',
        component: NewsListComponent
      },
      {
        path: 'news/tags',
        component: NewsTagsComponent
      },
      {
        path: 'coverage/content/:id',
        component: CoverageContentComponent
      },
      {
        path: 'coverage/list',
        component: CoverageListComponent
      },
      {
        path: 'files',
        component: FilesComponent
      },
      {
        path: 'home/subscriptions',
        component: HomeSubscriptionsComponent
      },
      {
        path: 'admin/maintain-modules',
        component: MaintainModulesComponent
      },
      {
        path: 'public',
        loadChildren: './pages/public/public.module#PublicModule'
      },
      {
        path: 'email',
        loadChildren: './pages/email/email.module#EmailModule'
      },
      {
        path: 'solutions',
        loadChildren: './pages/solutions/solutions.module#SolutionsModule'
      },
      {
        path: 'partners',
        loadChildren: './pages/partners/partners.module#PartnersModule'
      },
      {
        path: 'supports',
        loadChildren: './pages/supports/supports.module#SupportsModule'
      },
      {
        path: 'landing-pages',
        loadChildren: './pages/landing-pages/landing-pages.module#LandingPagesModule'
      },
      {
        path: 'download-center',
        loadChildren: './pages/download-center/download-center.module#DownloadCenterModule'
      },
      {
        path: 'products',
        loadChildren: './pages/products/products.module#ProductsModule'
      },
      {
        path: 'tools',
        loadChildren: './pages/tools/tools.module#ToolsModule'
      },
      {
        path: 'cdn',
        component: CdnComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
