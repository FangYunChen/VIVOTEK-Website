import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageTypeListComponent } from './image-type-list/image-type-list.component';
import { ImageTypeContentComponent } from './image-type-content/image-type-content.component';

const routes: Routes = [
  {
    path: '',
    component: ImageTypeListComponent
  },
  {
    path: ':id',
    component: ImageTypeContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageTypeRoutingModule { }
