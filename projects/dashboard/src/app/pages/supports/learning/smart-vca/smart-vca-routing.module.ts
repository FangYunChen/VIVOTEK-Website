import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmartVcaListComponent } from './smart-vca-list/smart-vca-list.component';
import { SmartVcaContentComponent } from './smart-vca-content/smart-vca-content.component';

const routes: Routes = [
  {
    path: '',
    component: SmartVcaListComponent
  },
  {
    path: ':id',
    component: SmartVcaContentComponent
  },
  {
    path: 'support',
    loadChildren: './support/smart-vca-support.module#SmartVcaSupportModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartVcaRoutingModule { }
