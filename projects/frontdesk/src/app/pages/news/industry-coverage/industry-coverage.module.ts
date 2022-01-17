import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryCoverageRoutingModule } from './industry-coverage-routing.module';
import { IndustryCoverageComponent } from './components/industry-coverage/industry-coverage.component';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IndustryCoverageRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  declarations: [IndustryCoverageComponent]
})
export class IndustryCoverageModule {}
