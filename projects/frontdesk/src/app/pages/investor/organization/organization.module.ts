import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './components/organization/organization.component';
import { SharedModule } from '@frontdesk/shared/shared.module';

@NgModule({
  imports: [CommonModule, OrganizationRoutingModule, SharedModule],
  declarations: [OrganizationComponent]
})
export class OrganizationModule {}
