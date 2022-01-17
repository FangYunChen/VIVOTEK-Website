import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SortablejsModule } from 'angular-sortablejs';
import { VIVOCloudRoutingModule } from './vivocloud-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { OverviewComponent } from './overview/overview.component';
import { AppComponent } from './app/app.component';
import { PortalComponent } from './portal/portal.component';
import { IntroCourseMenuComponent } from './intro-course/intro-course-menu/intro-course-menu.component';
import { IntroCourseEditorComponent } from './intro-course/intro-course-editor/intro-course-editor.component';
import { VivocloudContentComponent } from './vivocloud/vivocloud-content/vivocloud-content.component';
import { VivocloudListComponent } from './vivocloud/vivocloud-list/vivocloud-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    VIVOCloudRoutingModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule
  ],
  declarations: [
    OverviewComponent,
    AppComponent,
    PortalComponent,
    IntroCourseMenuComponent,
    IntroCourseEditorComponent,
    VivocloudContentComponent,
    VivocloudListComponent
  ]
})
export class VIVOCloudModule { }
