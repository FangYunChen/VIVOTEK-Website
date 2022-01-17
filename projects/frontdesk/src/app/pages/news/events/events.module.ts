import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { EventsComponent } from './components/events/events.component';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  imports: [CommonModule, EventsRoutingModule, SharedModule],
  declarations: [EventsComponent, EventsPageComponent]
})
export class EventsModule {}
