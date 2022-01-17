import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: '../who-we-are/overview/overview.module#OverviewModule'
  },
  {
    path: 'awards',
    loadChildren: './awards/awards.module#AwardsModule'
  },
  {
    path: 'milestone',
    loadChildren: './mile-stone/mile-stone.module#MileStoneModule'
  },
  {
    path: 'relatedlinks',
    loadChildren: './related-links/related-links.module#RelatedlinksModule'
  },
  {
    path: 'our-brand',
    loadChildren: './our-brand/our-brand.module#OurBrandModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhoWeAreRoutingModule { }
