import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VWAComponent } from './vwa/vwa/vwa.component';
import { InsiderWebinarsComponent } from './insider-webinars/insider-webinars.component';

const routes: Routes = [
  {
    path: 'vwa',
    component: VWAComponent
  },
  {
    path: 'webinars',
    component: InsiderWebinarsComponent
  },
  {
    path: 'feature-article',
    loadChildren: './feature-article/feature-article.module#FeatureArticleModule'
  },
  {
    path: 'certification',
    loadChildren: './certification/certification.module#CertificationModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule {}
