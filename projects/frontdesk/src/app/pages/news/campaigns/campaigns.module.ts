import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { CampaignsPageComponent } from './components/campaigns-page/campaigns-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [CampaignsComponent, CampaignsPageComponent]
})
export class CampaignsModule {}
