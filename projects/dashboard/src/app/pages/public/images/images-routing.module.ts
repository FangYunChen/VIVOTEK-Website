import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'image',
    loadChildren: './image/image.module#ImageModule'
  },
  {
    path: 'type',
    loadChildren: './image-type/image-type.module#ImageTypeModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule { }
