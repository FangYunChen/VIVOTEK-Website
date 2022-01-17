import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmartTrackingAdvancedListComponent } from './smart-tracking-advanced-list/smart-tracking-advanced-list.component';
import { SmartTrackingAdvancedContentComponent } from './smart-tracking-advanced-content/smart-tracking-advanced-content.component';

const routes: Routes = [
  {
    path: '',
    component: SmartTrackingAdvancedListComponent
  },
  {
    path: ':id',
    component: SmartTrackingAdvancedContentComponent
  },
  {
    path: 'support',
    loadChildren: './support/smart-tracking-advanced-support.module#SmartTrackingAdvancedSupportModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartTrackingAdvancedRoutingModule { }
