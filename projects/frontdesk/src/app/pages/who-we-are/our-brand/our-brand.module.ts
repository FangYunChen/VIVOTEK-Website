import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { OurBrandComponent } from './components/our-brand.component';
import { OurBrandRoutingModule } from './our-brand-routing.module';

@NgModule({
  imports: [CommonModule, OurBrandRoutingModule, SharedModule],
  declarations: [OurBrandComponent]
})
export class OurBrandModule { }
