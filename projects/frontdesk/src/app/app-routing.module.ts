import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ExternalSigninComponent } from './layout/components/external-signin/external-signin.component';
import { I18nComponent } from './layout/components/i18n/i18n.component';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { PageNotFoundComponent } from './layout/components/page-not-found/page-not-found.component';
import { SearchPageComponent } from './layout/components/search-page/search-page.component';
import { PathQueryGuardService } from './vvtk-core/services/path-query-guard.service';
import { LanguageService } from './vvtk-core/services/language.service';

const pageRoutes: Routes = [
  {
    path: 'who-we-are',
    loadChildren: './pages/who-we-are/who-we-are.module#WhoWeAreModule',
    data: { title: 'who we are' }
  },
  {
    path: 'news',
    loadChildren: './pages/news/news.module#NewsModule',
    data: { title: 'News' }
  },
  {
    path: 'careers',
    loadChildren: './pages/careers/careers.module#CareersModule',
    data: { title: 'Careers' }
  },
  {
    path: 'csr',
    loadChildren: './pages/csr/csr.module#CsrModule',
    data: { title: 'CSR' }
  },
  {
    path: 'investor',
    loadChildren: './pages/investor/investor.module#InvestorModule',
    data: { title: 'Investor' }
  },
  {
    path: 'where-to-buy',
    loadChildren: './pages/where-to-buy/where-to-buy.module#WhereToBuyModule',
    data: { title: 'Where to buy' }
  },
  {
    path: 'solutions',
    loadChildren: './pages/solutions/solutions.module#SolutionsModule',
    data: { title: 'Solutions' }
  },
  {
    path: 'partners',
    loadChildren: './pages/partners/partners.module#PartnersModule'
  },
  {
    path: 'downloads',
    loadChildren: './pages/downloads/downloads.module#DownloadsModule'
  },
  {
    path: 'tools',
    loadChildren: './pages/tools/tools.module#ToolsModule'
  },
  {
    path: 'learning',
    loadChildren: './pages/learning/learning.module#LearningModule'
  },
  {
    path: 'support',
    loadChildren: './pages/support/support.module#SupportModule'
  },
  {
    path: 'vwa',
    loadChildren: './pages/learning/vwa/vwa.module#VWAModule'
  },
  {
    path: 'vivocloud',
    loadChildren: './pages/vivocloud/vivocloud.module#VIVOCloudModule'
  },
  {
    path: 'index',
    redirectTo: ''
  },
  {
    path: 'search-page',
    component: SearchPageComponent
  },
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule',
    data: { title: '' }
  },
  {
    path: '',
    loadChildren: './pages/products/products.module#ProductsModule',
    data: { title: 'Products' }
  }
];

const routes: Routes = [
  {
    path: 'external-signin',
    component: ExternalSigninComponent
  },
  {
    path: '',
    component: I18nComponent,
    children: [
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '404',
            component: PageNotFoundComponent
          },
          ...pageRoutes
        ]
      }
    ]
  },
  {
    path: '**',
    canActivate: [PathQueryGuardService],
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    const index = this.router.config.findIndex(x => x.path === '');

    const languageRoutes: Routes = (LanguageService.languageList || [])
      .filter(lang => lang.isEnabled)
      .map(lang => {
        return {
          path: lang.code,
          component: I18nComponent,
          data: { language: lang.code, lang: lang.code },
          children: [
            {
              path: '',
              component: LayoutComponent,
              children: pageRoutes
            }
          ]
        };
      });

    this.router.config.splice(index, 0, ...languageRoutes);
    this.router.resetConfig(this.router.config);
  }
}
