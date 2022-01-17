import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleContentComponent } from './article-content/article-content.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: './product/support-article-product.module#SupportArticleProductModule'
  },
  {
    path: 'tag',
    loadChildren: './tag/support-article-tag.module#SupportArticleTagModule'
  },
  {
    path: 'overview',
    component: OverviewPageComponent
  },
  {
    path: '',
    component: ArticleListComponent
  },
  {
    path: ':id',
    component: ArticleContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportArticleRoutingModule { }
