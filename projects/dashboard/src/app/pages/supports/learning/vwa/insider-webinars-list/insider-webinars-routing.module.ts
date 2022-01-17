import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: './insider-webinars-list/insider-webinars-list.module#InsiderWebinarsListModule'
  },
  {
    path: 'series',
    loadChildren: './series/series.module#SeriesModule'
  },
  {
    path: 'language',
    loadChildren: './language/language.module#LanguageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsiderWebinarsRoutingModule { }
