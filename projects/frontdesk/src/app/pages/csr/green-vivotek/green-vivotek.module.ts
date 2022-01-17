import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { GreenVivotekPageComponent } from './components/green-vivotek-page/green-vivotek-page.component';
import { GreenVivotekComponent } from './components/green-vivotek/green-vivotek.component';
import { GreenVivotekRoutingModule } from './green-vivotek-routing.module';

@NgModule({
  imports: [CommonModule, GreenVivotekRoutingModule, SharedModule],
  declarations: [GreenVivotekComponent, GreenVivotekPageComponent]
})
export class GreenVivotekModule {}
