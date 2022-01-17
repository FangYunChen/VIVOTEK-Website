import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './overview/overview.component';
import { TroubleShootingComponent } from './trouble-shooting/trouble-shooting.component';
import { WarrantyRmaComponent } from './warranty-rma/warranty-rma.component';
import { KnowledgeContentComponent } from './knowledge/knowledge-content/knowledge-content.component';
import { KnowledgeListComponent } from './knowledge/knowledge-list/knowledge-list.component';
import { ProductArticleComponent } from './product-article/product-article.component';
import { ProductArticleListComponent } from './product-article/product-article-list/product-article-list.component';
import { ProductArticlePageComponent } from './product-article/product-article-page/product-article-page.component';
import { SupportCenterComponent } from './center/center.component';

const routes: Routes = [
  {
    path: 'compatibility',
    loadChildren: './compatibility/compatibility.module#CompatibilityModule'
  },
  {
    path: 'trouble-shooting',
    component: TroubleShootingComponent
  },
  {
    path: 'warranty-rma',
    component: WarrantyRmaComponent
  },
  {
    path: 'center',
    component: SupportCenterComponent
  },
  {
    path: 'legacy',
    loadChildren: '../products/product-list/product-list.module#ProductListModule'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'knowledge',
        children: [
          {
            path: '',
            component: KnowledgeListComponent
          },
          {
            path: ':article',
            component: KnowledgeContentComponent
          }
        ]
      },
      {
        path: 'tag/:tag',
        children: [
          {
            path: '',
            component: KnowledgeListComponent
          },
          {
            path: ':article',
            component: KnowledgeContentComponent
          }
        ]
      },
      {
        path: ':product/:tabType',
        component: ProductArticleComponent,
        children: [
          {
            path: '',
            component: ProductArticleListComponent
          },
          {
            path: ':article',
            component: ProductArticlePageComponent
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
