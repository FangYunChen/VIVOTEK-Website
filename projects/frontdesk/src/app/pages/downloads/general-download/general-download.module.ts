import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GeneralDownloadComponent } from '../general-download/general-download.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatSnackBarModule
  ],
  exports: [
    GeneralDownloadComponent
  ],
  declarations: [
    GeneralDownloadComponent,
  ]
})
export class GeneralDownloadModule { }
