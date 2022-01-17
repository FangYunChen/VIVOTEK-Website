import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkingAtVivotekComponent } from './components/working-at-vivotek/working-at-vivotek.component';

const routes: Routes = [
  {
    path: '',
    component: WorkingAtVivotekComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingAtVivotekRoutingModule {}
