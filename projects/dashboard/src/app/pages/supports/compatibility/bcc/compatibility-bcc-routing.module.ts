import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BccComponent } from './bcc.component';

const routes: Routes = [
  {
    path: '',
    component: BccComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompatibilityBccRoutingModule { }
