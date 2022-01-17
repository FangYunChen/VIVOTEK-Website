import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CybersecurityRoutingModule } from './cybersecurity-routing.module';
import { CybersecurityComponent } from './cybersecurity/cybersecurity.component';
import { CybersecurityManagementComponent } from './cybersecurity-management/cybersecurity-management.component';
import { ProductSecurityComponent } from './product-security/product-security.component';
import { SharedModule } from '@frontdesk/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CybersecurityRoutingModule,
    SharedModule
  ],
  declarations: [
    CybersecurityComponent,
    CybersecurityManagementComponent,
    ProductSecurityComponent
  ]
})
export class CybersecurityModule { }
