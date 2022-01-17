import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageListComponent } from './language-list/language-list.component';
import { LanguageContentComponent } from './language-content/language-content.component';


const routes: Routes = [
  {
    path: '',
    component: LanguageListComponent
  },
  {
    path: ':id',
    component: LanguageContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageRoutingModule { }
