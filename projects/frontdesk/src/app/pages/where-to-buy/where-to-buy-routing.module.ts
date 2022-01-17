import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowToBuyComponent } from './component/how-to-buy/how-to-buy.component';
import { WhereToBuyPageComponent } from './component/where-to-buy-page/where-to-buy-page.component';
import { WhereToBuyComponent } from './component/where-to-buy/where-to-buy.component';

const routes: Routes = [
  {
    path: 'how-to-buy',
    component: HowToBuyComponent
  },
  {
    path: '',
    component: WhereToBuyComponent
  },
  {
    path: ':id/:country',
    component: WhereToBuyPageComponent
  },
  {
    path: 'search/:id/:filter',
    component: WhereToBuyPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhereToBuyRoutingModule {}
