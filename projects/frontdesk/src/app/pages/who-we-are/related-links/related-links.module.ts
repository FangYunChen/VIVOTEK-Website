import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { RelatedlinksComponent } from './components/related-links.component';
import { RelatedlinksRoutingModule } from './related-links-routing.module';

@NgModule({
  imports: [CommonModule, RelatedlinksRoutingModule, SharedModule],
  declarations: [RelatedlinksComponent]
})
export class RelatedlinksModule { }
