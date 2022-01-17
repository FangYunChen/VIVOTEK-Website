import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GreenVivotekPageComponent } from './components/green-vivotek-page/green-vivotek-page.component';
import { GreenVivotekComponent } from './components/green-vivotek/green-vivotek.component';

const routes: Routes = [
  {
    path: '',
    component: GreenVivotekComponent,
    children: [
      {
        path: '',
        component: GreenVivotekPageComponent
      },
      {
        path: ':id',
        component: GreenVivotekPageComponent
      },
      {
        path: ':id/:title',
        component: GreenVivotekPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GreenVivotekRoutingModule { }
