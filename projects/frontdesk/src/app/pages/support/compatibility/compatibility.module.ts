import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompatibilityRoutingModule } from './compatibility-routing.module';
import { CompatibilityListComponent } from './compatibility-list/compatibility-list.component';
import { CompatibilityFormComponent } from './compatibility-form/compatibility-form.component';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CompatibilityRoutingModule
  ],
  declarations: [CompatibilityListComponent, CompatibilityFormComponent]
})
export class CompatibilityModule {}
