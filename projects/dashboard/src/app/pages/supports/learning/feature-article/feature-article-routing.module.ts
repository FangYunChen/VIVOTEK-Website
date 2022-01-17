import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureArticleListComponent } from './feature-article-list/feature-article-list.component';
import { FeatureArticleContentComponent } from './feature-article-content/feature-article-content.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureArticleListComponent
  },
  {
    path: ':id',
    component: FeatureArticleContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureArticleRoutingModule {}
