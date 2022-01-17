import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineTrainingComponent } from './online-training/online-training.component';
import { VECIIComponent } from './vecii/vecii.component';
import { VPENorthAmericaComponent } from './vpe-north-america/vpe-north-america.component';
import { VWAComponent } from './vwa/vwa.component';
import { VECComponent } from './vec/vec.component';
import { CourseComponent } from './course/course.component';
import { InsiderWebinarsComponent } from './insider-webinars/insider-webinars.component';

const routes: Routes = [
  {
    path: 'online-training',
    component: OnlineTrainingComponent
  },
  {
    path: 'vec',
    component: VECComponent
  },
  {
    path: 'vecii',
    component: VECIIComponent
  },
  {
    path: 'vpe-north-america',
    component: VPENorthAmericaComponent
  },
  {
    path: 'course',
    component: CourseComponent
  },
  {
    path: 'insider-webinars',
    component: InsiderWebinarsComponent
  },
  {
    path: 'insider-webinars-list',
    loadChildren: './insider-webinars-list/insider-webinars.module#InsiderWebinarsModule'
  },
  {
    path: '',
    component: VWAComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VWARoutingModule { }
