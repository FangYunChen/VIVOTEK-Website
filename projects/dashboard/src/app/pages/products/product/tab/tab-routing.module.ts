import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabListComponent } from './tab-list/tab-list.component';
import { TabContentComponent } from './tab-content/tab-content.component';

const routes: Routes = [
  {
    path: ':productId',
    component: TabListComponent
  },
  {
    path: ':productId/:tabId',
    component: TabContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabRoutingModule { }
