import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { ContentComponent } from './components/content/content.component';
import { ContentRoutingModule } from './content-routing.module';

@NgModule({
  imports: [CommonModule, ContentRoutingModule, SharedModule],
  declarations: [ContentComponent, ContentPageComponent]
})
export class ContentModule {}
