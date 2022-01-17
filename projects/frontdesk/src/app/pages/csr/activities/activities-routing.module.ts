import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivitiesPageComponent } from './components/activities-page/activities-page.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesComponent
  },
  {
    path: ':id',
    component: ActivitiesPageComponent
  },
  {
    path: ':id/:title',
    component: ActivitiesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
