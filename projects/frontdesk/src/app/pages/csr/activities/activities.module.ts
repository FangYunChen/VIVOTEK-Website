import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './components/activities/activities.component';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { ActivitiesPageComponent } from './components/activities-page/activities-page.component';

@NgModule({
  imports: [CommonModule, ActivitiesRoutingModule, SharedModule],
  declarations: [ActivitiesComponent, ActivitiesPageComponent]
})
export class ActivitiesModule {}
