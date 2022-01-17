import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AppComponent } from './app/app.component';
import { PortalComponent } from './portal/portal.component';
import { IntroCourseMenuComponent } from './intro-course/intro-course-menu/intro-course-menu.component';
import { VivocloudListComponent } from './vivocloud/vivocloud-list/vivocloud-list.component';
import { VivocloudContentComponent } from './vivocloud/vivocloud-content/vivocloud-content.component';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'support',
    loadChildren: './support/support.module#SupportModule'
  },
  {
    path: 'app',
    component: AppComponent
  },
  {
    // route from app to surveillance(have chance to change)
    path: 'surveillance',
    component: AppComponent
  },
  {
    path: 'portal',
    component: PortalComponent
  },
  {
    // route from portal to retail(have chance to change)
    path: 'retail',
    component: PortalComponent
  },
  {
    path: 'intro-course',
    component: IntroCourseMenuComponent
  },
  {
    path: '',
    component: VivocloudListComponent
  },
  {
    path: ':id',
    component: VivocloudContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VIVOCloudRoutingModule { }
