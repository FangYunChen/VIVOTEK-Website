import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'icons',
    loadChildren: './icons/icons.module#IconsModule'
  },
  {
    path: 'images',
    loadChildren: './images/images.module#ImagesModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
