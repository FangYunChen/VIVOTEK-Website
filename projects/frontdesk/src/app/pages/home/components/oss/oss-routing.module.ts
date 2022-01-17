import { OssAnnouncementComponent } from './oss-announcement/oss-announcement.component';
import { OssTableContainerComponent } from './oss-table-container/oss-table-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OssComponent } from './oss.component';

const routes: Routes = [
  {
    path: '',
    component: OssComponent,
    children: [
      {
        path: ':modelId',
        component: OssAnnouncementComponent,
      },
      {
        path: '',
        component: OssTableContainerComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OssRoutingModule { }
