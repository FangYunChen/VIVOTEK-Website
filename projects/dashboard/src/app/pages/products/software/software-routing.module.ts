import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Vast2ListComponent } from './vast2/vast2-list/vast2-list.component';
import { Vast2ContentComponent } from './vast2/vast2-content/vast2-content.component';
import { ShepherdListComponent } from './shepherd/shepherd-list/shepherd-list.component';
import { ShepherdContentComponent } from './shepherd/shepherd-content/shepherd-content.component';

const routes: Routes = [
  {
    path: 'vast2',
    component: Vast2ListComponent
  },
  {
    path: 'vast2/:id',
    component: Vast2ContentComponent
  },
  {
    path: 'shepherd',
    component: ShepherdListComponent
  },
  {
    path: 'shepherd/:id',
    component: ShepherdContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
