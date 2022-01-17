import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TagComponent } from './components/tag.component';

const routes: Routes = [
  {
    path: '',
    component: TagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class SupportArticleTagRoutingModule { }
