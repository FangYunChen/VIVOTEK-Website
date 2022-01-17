import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'icon',
    loadChildren: './icon/icon.module#IconModule'
  },
  {
    path: 'type',
    loadChildren: './icon-type/icon-type.module#IconTypeModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule { }
