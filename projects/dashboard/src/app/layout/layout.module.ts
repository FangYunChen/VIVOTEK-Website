import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { AdminComponent } from './admin/admin.component';
import { BreadcrumbsComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { IconSidenavDirective } from './sidenav/icon-sidenav.directive';
import { MediaReplayService } from './sidenav/mediareplay/media-replay.service';
import { SidenavItemComponent } from './sidenav/sidenav-item/sidenav-item.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavService } from './sidenav/sidenav.service';
import { ToolbarUserButtonComponent } from './toolbar/toolbar-user-button/toolbar-user-button.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [CommonModule, RouterModule, SharedMaterialModule, FlexLayoutModule, FormsModule, PerfectScrollbarModule],
  entryComponents: [],
  declarations: [
    SidenavComponent,
    SidenavItemComponent,
    IconSidenavDirective,
    BreadcrumbsComponent,
    AdminComponent,
    ToolbarComponent,
    ToolbarUserButtonComponent
  ],
  providers: [
    SidenavService,
    MediaReplayService,
    BreadcrumbService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class LayoutModule {}
