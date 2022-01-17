import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { ReviewerPermissionRoutingModule } from './reviewer-permission-routing.module';
import { ReviewerPermissionListComponent } from './reviewer-permission-list/reviewer-permission-list.component';
import { DownloadDropdownListService } from '../services/download-dropdown-list.service';
import { CheckListDialogComponent } from '../../../shared/components/check-list-dialog/check-list-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    ReviewerPermissionRoutingModule
  ],
  declarations: [
    ReviewerPermissionListComponent,
  ],
  entryComponents: [CheckListDialogComponent],
  providers: [DownloadDropdownListService],
})
export class ReviewerPermissionModule { }
