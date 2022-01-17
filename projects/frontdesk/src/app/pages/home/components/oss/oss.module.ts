import { AuthService } from '@frontdesk/core/services';
import { OssService } from './oss.service';
import { OssTableComponent } from './oss-table/oss-table.component';
import { OssComponent } from './oss.component';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OssRoutingModule } from './oss-routing.module';
import { OssAnnouncementComponent, OssAnnouncementDialogComponent } from './oss-announcement/oss-announcement.component';
import { OssTableContainerComponent } from './oss-table-container/oss-table-container.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    OssRoutingModule
  ],
  declarations: [
    OssComponent,
    OssTableComponent,
    OssAnnouncementComponent,
    OssTableContainerComponent,
    OssAnnouncementDialogComponent
  ],
  providers: [
    OssService,
    AuthService
  ],
  entryComponents: [OssAnnouncementDialogComponent]

})
export class OssModule { }
