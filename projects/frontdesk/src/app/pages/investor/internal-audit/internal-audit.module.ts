import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalAuditRoutingModule } from './internal-audit-routing.module';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { InternalAuditComponent } from './components/internal-audit/internal-audit.component';

@NgModule({
  imports: [CommonModule, InternalAuditRoutingModule, SharedModule],
  declarations: [InternalAuditComponent]
})
export class InternalAuditModule {}
