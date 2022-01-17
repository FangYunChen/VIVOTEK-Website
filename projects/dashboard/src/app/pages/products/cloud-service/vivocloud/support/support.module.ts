import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { PageComponent } from './page/page.component';

@NgModule({
  imports: [
    CommonModule,
    SupportRoutingModule,
    SharedModule
  ],
  declarations: [
    PageComponent
  ]
})
export class SupportModule { }
