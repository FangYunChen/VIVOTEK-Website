import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuggestionListComponent } from './suggestion-list.component';

const routes: Routes = [
  {
    path: '',
    component: SuggestionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompatibilitySuggestionListRoutingModule { }
