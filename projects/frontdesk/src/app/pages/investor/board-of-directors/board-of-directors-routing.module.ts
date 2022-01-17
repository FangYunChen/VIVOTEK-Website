import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardOfDirectorsComponent } from './components/board-of-directors/board-of-directors.component';

const routes: Routes = [
  {
    path: '',
    component: BoardOfDirectorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardOfDirectorsRoutingModule {}
