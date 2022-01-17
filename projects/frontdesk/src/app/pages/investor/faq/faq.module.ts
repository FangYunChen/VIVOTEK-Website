import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { FaqComponent } from './components/faq/faq.component';
import { FaqRoutingModule } from './faq-routing.module';

@NgModule({
  imports: [CommonModule, FaqRoutingModule, SharedModule],
  declarations: [FaqComponent]
})
export class FaqModule {}
