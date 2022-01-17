import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../shared-material/shared-material.module';
import { SharedModule } from '../../shared/shared.module';
import { EmailComponent } from './email/email.component';
import { EmailProjectRegistrationBccComponent } from './email-project-registration-bcc/email-project-registration-bcc.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    SharedMaterialModule,
    SharedModule,
  ],
  exports: [
    EmailComponent,
    EmailProjectRegistrationBccComponent,
  ],
  declarations: [
    EmailComponent,
    EmailProjectRegistrationBccComponent,
  ]
})
export class SharedEmailModule { }
