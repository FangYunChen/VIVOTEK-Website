import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessoryListComponent } from './accessory-list/accessory-list.component';
import { AccessoryContentComponent } from './accessory-content/accessory-content.component';
import { AccessoryCombinationContentComponent } from './accessory-combination-content/accessory-combination-content.component';
import { AccessoryCombinationListComponent } from './accessory-combination-list/accessory-combination-list.component';

const routes: Routes = [
  {
    path: '',
    component: AccessoryListComponent
  },
  {
    path: ':id',
    component: AccessoryContentComponent
  },
  {
    path: ':id/combination-list',
    component: AccessoryCombinationListComponent
  },
  {
    path: ':id/:cid',
    component: AccessoryCombinationContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessoryRoutingModule { }
