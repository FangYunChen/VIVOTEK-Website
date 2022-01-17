import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { GeneralDownloadModule } from '../general-download/general-download.module';
import { SalesAndMarketingRoutingModule } from './sales-and-marketing-routing.module';
import { BrochureComponent } from './brochure/brochure.component';
import { FlyerComponent } from './flyer/flyer.component';
import { MarketingPostersComponent } from './marketing-posters/marketing-posters.component';
import { MarketingPrintAdComponent } from './marketing-print-ad/marketing-print-ad.component';
import { MarketingFlyerComponent } from './marketing-flyer/marketing-flyer.component';
import { MarketingBannerComponent } from './marketing-banner/marketing-banner.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralDownloadModule,
    SalesAndMarketingRoutingModule
  ],
  declarations: [
    BrochureComponent,
    FlyerComponent,
    MarketingPostersComponent,
    MarketingPrintAdComponent,
    MarketingFlyerComponent,
    MarketingBannerComponent
  ]
})
export class SalesAndMarketingModule { }
