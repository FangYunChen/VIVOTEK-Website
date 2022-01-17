import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { EventsPageComponent } from './components/events-page/events-page.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: ':id',
    component: EventsPageComponent
  },
  {
    path: ':id/:title',
    component: EventsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
