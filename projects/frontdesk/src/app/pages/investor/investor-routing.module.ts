import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'corporate-governance',
    loadChildren:
      './corporate-governance/corporate-governance.module#CorporateGovernanceModule'
  },
  {
    path: 'organization',
    loadChildren: './organization/organization.module#OrganizationModule'
  },

  {
    path: 'board-of-directors',
    loadChildren:
      './board-of-directors/board-of-directors.module#BoardOfDirectorsModule'
  },
  {
    path: 'remuneration-committee',
    loadChildren:
      './remuneration-committee/remuneration-committee.module#RemunerationCommitteeModule'
  },
  {
    path: 'internal-audit',
    loadChildren: './internal-audit/internal-audit.module#InternalAuditModule'
  },
  {
    path: 'shareholder-list',
    loadChildren:
      './shareholder-list/shareholder-list.module#ShareholderListModule'
  },
  {
    path: 'major-internal-policies',
    loadChildren:
      './major-internal-policies/major-internal-policies.module#MajorInternalPoliciesModule'
  },
  {
    path: 'monthly-sales',
    loadChildren: './monthly-sales/monthly-sales.module#MonthlySalesModule'
  },
  {
    path: 'quarterly-results',
    loadChildren:
      './quarterly-results/quarterly-results.module#QuarterlyResultsModule'
  },
  {
    path: 'investor-conference',
    loadChildren:
      './investor-conference/investor-conference.module#InvestorConferenceModule'
  },
  {
    path: 'shareholders-meeting',
    loadChildren:
      './shareholders-meeting/shareholders-meeting.module#ShareholdersMeetingModule'
  },
  {
    path: 'dividend-history',
    loadChildren:
      './dividend-history/dividend-history.module#DividendHistoryModule'
  },
  {
    path: 'contacts',
    loadChildren: './contacts/contacts.module#ContactsModule'
  },
  {
    path: 'faq',
    loadChildren: './faq/faq.module#FaqModule'
  },
  {
    path: 'service',
    loadChildren: './service/content.module#ContentModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorRoutingModule {}
