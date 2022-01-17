import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { UserPermissionRoutingModule } from './user-permission-routing.module';
import { DownloadDropdownListService } from '../services/download-dropdown-list.service';
import { CheckListDialogComponent } from '../../../shared/components/check-list-dialog/check-list-dialog.component';
import { UserPermissionListComponent } from './user-permission-list/user-permission-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    UserPermissionRoutingModule
  ],
  declarations: [
    UserPermissionListComponent
  ],
  entryComponents: [CheckListDialogComponent],
  providers: [DownloadDropdownListService],
})
export class UserPermissionModule { }
