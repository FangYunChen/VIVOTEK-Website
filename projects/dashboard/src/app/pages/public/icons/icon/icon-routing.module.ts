import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconListComponent } from './icon-list/icon-list.component';
import { IconContentComponent } from './icon-content/icon-content.component';

const routes: Routes = [
  {
    path: '',
    component: IconListComponent
  },
  {
    path: ':id',
    component: IconContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconRoutingModule { }
