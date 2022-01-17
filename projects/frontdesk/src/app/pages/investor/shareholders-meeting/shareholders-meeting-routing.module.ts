import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareholdersMeetingComponent } from './components/shareholders-meeting/shareholders-meeting.component';

const routes: Routes = [
  {
    path: '',
    component: ShareholdersMeetingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareholdersMeetingRoutingModule {}
