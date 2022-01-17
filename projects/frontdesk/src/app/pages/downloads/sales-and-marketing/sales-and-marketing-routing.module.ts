import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrochureComponent } from './brochure/brochure.component';
import { FlyerComponent } from './flyer/flyer.component';
import { MarketingPostersComponent } from './marketing-posters/marketing-posters.component';
import { MarketingPrintAdComponent } from './marketing-print-ad/marketing-print-ad.component';
import { MarketingFlyerComponent } from './marketing-flyer/marketing-flyer.component';
import { MarketingBannerComponent } from './marketing-banner/marketing-banner.component';

const routes: Routes = [
  {
    path: 'brochure',
    component: BrochureComponent
  },
  {
    path: 'flyer',
    component: FlyerComponent
  },
  {
    path: 'marketing-posters',
    component: MarketingPostersComponent
  },
  {
    path: 'marketing-print-ad',
    component: MarketingPrintAdComponent
  },
  {
    path: 'marketing-flyer',
    component: MarketingFlyerComponent
  },
  {
    path: 'marketing-banner',
    component: MarketingBannerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesAndMarketingRoutingModule { }
