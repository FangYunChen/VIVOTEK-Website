import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecificationMenuComponent } from './tree/specification-menu/specification-menu.component';
import { DisplaySettingComponent } from './display-setting/display-setting.component';
import { DisplayOrderComponent } from './display-order/display-order.component';

const routes: Routes = [
  {
    path: 'tree',
    component: SpecificationMenuComponent
  },
  {
    path: 'display-setting',
    component: DisplaySettingComponent
  },
  {
    path: 'display-order',
    component: DisplayOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificationRoutingModule { }
