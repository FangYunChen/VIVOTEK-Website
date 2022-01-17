import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarrantyRmaComponent } from './warranty-rma/warranty-rma.component';
import { TroubleShootingComponent } from './trouble-shooting/trouble-shooting.component';
import { SupportCenterComponent } from './center/center.component';

const routes: Routes = [
  {
    path: 'learning',
    loadChildren: './learning/learning.module#LearningModule'
  },
  {
    path: 'compatibility',
    loadChildren: './compatibility/compatibility.module#CompatibilityModule'
  },
  {
    path: 'warranty-rma',
    component: WarrantyRmaComponent
  },
  {
    path: 'trouble-shooting',
    component: TroubleShootingComponent
  },
  {
    path: 'article',
    loadChildren: './support-article/support-article.module#SupportArticleModule'
  },
  {
    path: 'cybersecurity',
    loadChildren: './cybersecurity/cybersecurity.module#CybersecurityModule'
  },
  {
    path: 'center',
    component: SupportCenterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportsRoutingModule { }
