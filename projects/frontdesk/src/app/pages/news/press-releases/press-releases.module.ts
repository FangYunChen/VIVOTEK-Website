import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PressReleasesRoutingModule } from './press-releases-routing.module';
import { PressReleasesComponent } from './components/press-releases/press-releases.component';
import { PressReleasesPageComponent } from './components/press-releases-page/press-releases-page.component';
import { PressReleasesTagComponent } from './components/press-releases-tag/press-releases-tag.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, PressReleasesRoutingModule, SharedModule],
  declarations: [PressReleasesComponent, PressReleasesPageComponent, PressReleasesTagComponent]
})
export class PressReleasesModule {}
