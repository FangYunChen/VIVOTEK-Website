import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompatibilityListComponent } from './compatibility-list/compatibility-list.component';
import { CompatibilityFormComponent } from './compatibility-form/compatibility-form.component';

const routes: Routes = [
  { path: '', component: CompatibilityListComponent },
  { path: 'suggest-form', component: CompatibilityFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompatibilityRoutingModule {}
