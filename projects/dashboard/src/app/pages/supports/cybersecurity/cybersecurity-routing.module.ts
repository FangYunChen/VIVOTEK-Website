import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CybersecurityComponent } from './cybersecurity/cybersecurity.component';
import { CybersecurityManagementComponent } from './cybersecurity-management/cybersecurity-management.component';
import { ProductSecurityComponent } from './product-security/product-security.component';
const routes: Routes = [
  {
    path: '',
    component: CybersecurityComponent
  },
  {
    path: 'cybersecurity-management',
    component: CybersecurityManagementComponent
  },
  {
    path: 'product-security',
    component: ProductSecurityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CybersecurityRoutingModule { }
