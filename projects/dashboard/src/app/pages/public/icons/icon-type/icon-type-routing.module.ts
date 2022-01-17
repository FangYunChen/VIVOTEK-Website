import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconTypeListComponent } from './icon-type-list/icon-type-list.component';
import { IconTypeContentComponent } from './icon-type-content/icon-type-content.component';

const routes: Routes = [
  {
    path: '',
    component: IconTypeListComponent
  },
  {
    path: ':id',
    component: IconTypeContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconTypeRoutingModule { }
