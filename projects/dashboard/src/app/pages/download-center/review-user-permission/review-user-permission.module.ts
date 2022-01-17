import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { DownloadDropdownListService } from '../services/download-dropdown-list.service';
import { ReviewUserPermissionContentComponent } from './review-user-permission-content/review-user-permission-content.component';
import { ReviewUserPermissionListComponent } from './review-user-permission-list/review-user-permission-list.component';
import { ReviewUserPermissionRoutingModule } from './review-user-permission-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    ReviewUserPermissionRoutingModule
  ],
  declarations: [
    ReviewUserPermissionListComponent,
    ReviewUserPermissionContentComponent,
  ],
  entryComponents: [ReviewUserPermissionContentComponent],
  providers: [DownloadDropdownListService],
})
export class ReviewUserPermissionModule { }
