import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { SharedModule } from '@frontdesk/shared/shared.module';

@NgModule({
  imports: [CommonModule, SocialMediaRoutingModule, SharedModule],
  declarations: [SocialMediaComponent]
})
export class SocialMediaModule {}
