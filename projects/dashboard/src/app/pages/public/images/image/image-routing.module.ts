import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageContentComponent } from './image-content/image-content.component';

const routes: Routes = [
  {
    path: '',
    component: ImageListComponent
  },
  {
    path: ':id',
    component: ImageContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageRoutingModule { }
