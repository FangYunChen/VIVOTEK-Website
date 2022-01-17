import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareholderListComponent } from './components/shareholder-list/shareholder-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShareholderListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareholderListRoutingModule {}
