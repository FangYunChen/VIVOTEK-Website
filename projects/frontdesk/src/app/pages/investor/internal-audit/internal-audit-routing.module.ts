import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalAuditComponent } from './components/internal-audit/internal-audit.component';

const routes: Routes = [
  {
    path: '',
    component: InternalAuditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalAuditRoutingModule {}
