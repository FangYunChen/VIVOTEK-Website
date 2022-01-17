import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesContentComponent } from './series-content/series-content.component';


const routes: Routes = [
  {
    path: '',
    component: SeriesListComponent
  },
  {
    path: ':id',
    component: SeriesContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeriesRoutingModule { }
