import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsiderWebinarsListComponent } from './insider-webinars-list/insider-webinars-list.component';
import { InsiderWebinarsContentComponent } from './insider-webinars-content/insider-webinars-content.component';


const routes: Routes = [
  {
    path: '',
    component: InsiderWebinarsListComponent
  },
  {
    path: ':id',
    component: InsiderWebinarsContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsiderWebinarsListRoutingModule { }
