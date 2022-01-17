import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { DownloadDropdownListService } from '../services/download-dropdown-list.service';
import { ReviewUserPermissionCountingCamaraContentComponent } from './review-user-permission-counting-camara-content/review-user-permission-counting-camara-content.component';
import { ReviewUserPermissionCountingCamaraListComponent } from './review-user-permission-counting-camara-list/review-user-permission-counting-camara-list.component';
import { ReviewUserPermissionCountingCamaraRoutingModule } from './review-user-permission-counting-camara-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    ReviewUserPermissionCountingCamaraRoutingModule
  ],
  declarations: [
    ReviewUserPermissionCountingCamaraListComponent,
    ReviewUserPermissionCountingCamaraContentComponent,
  ],
  entryComponents: [ReviewUserPermissionCountingCamaraContentComponent],
  providers: [DownloadDropdownListService],
})
export class ReviewUserPermissionCountingCamaraModule { }
