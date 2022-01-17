import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: './overview/overview.module#OverviewModule'
  },
  {
    path: 'activities',
    loadChildren: './activities/activities.module#ActivitiesModule'
  },
  {
    path: 'green-vivotek',
    loadChildren: './green-vivotek/green-vivotek.module#GreenVivotekModule'
  },
  {
    path: 'content',
    loadChildren: './content/content.module#ContentModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsrRoutingModule {}
