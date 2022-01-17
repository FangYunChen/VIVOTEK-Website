import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WhereToBuyPageComponent } from './component/where-to-buy-page/where-to-buy-page.component';
import { WhereToBuyComponent } from './component/where-to-buy/where-to-buy.component';
import { WhereToBuyRoutingModule } from './where-to-buy-routing.module';
import { HowToBuyComponent } from './component/how-to-buy/how-to-buy.component';

@NgModule({
  imports: [CommonModule, WhereToBuyRoutingModule, SharedModule],
  declarations: [WhereToBuyComponent, WhereToBuyPageComponent, HowToBuyComponent]
})
export class WhereToBuyModule {}
