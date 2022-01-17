import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SIAPartnerListComponent } from './sia-partner-list/sia-partner-list.component';
import { SIAPartnerContentComponent } from './sia-partner-content/sia-partner-content.component';


const routes: Routes = [
  {
    path: '',
    component: SIAPartnerListComponent
  },
  {
    path: ':id',
    component: SIAPartnerContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SIAPartnerRoutingModule { }
