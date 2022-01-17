import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { SupportListComponent } from './support-list/support-list.component';
import { AppComponent } from './app/app.component';
import { PortalComponent } from './portal/portal.component';
import { IntroCourseComponent } from './intro-course/intro-course.component';
import { VivocloudComponent } from './vivocloud/vivocloud.component';

const routes: Routes = [
  {
    path: '',
    component: VivocloudComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'support-list',
    component: SupportListComponent
  },
  {
    path: 'app',
    component: AppComponent
  },
  {
    // 原本路由為app，因有需求所以路由改成surveillance
    path: 'surveillance',
    component: AppComponent
  },
  {
    path: 'portal',
    component: PortalComponent
  },
  {
    // 原本路由為portal，因有需求所以路由改成retail
    path: 'retail',
    component: PortalComponent
  },
  {
    path: 'intro-course',
    component: IntroCourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VIVOCloudRoutingModule { }
