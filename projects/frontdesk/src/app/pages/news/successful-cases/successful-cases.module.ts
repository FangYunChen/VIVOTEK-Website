import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SuccessfulCasesComponent } from './components/successful-cases/successful-cases.component';
import { SuccessfulCasesRoutingModule } from './successful-cases-routing.module';
import { SuccessfulCasesPageComponent } from './components/successful-cases-page/successful-cases-page.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SuccessfulCasesRoutingModule, SharedModule],
  declarations: [SuccessfulCasesComponent, SuccessfulCasesPageComponent]
})
export class SuccessfulCasesModule {}
