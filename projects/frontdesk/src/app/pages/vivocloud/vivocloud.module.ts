import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VIVOCloudRoutingModule } from './vivocloud-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { OverviewComponent } from './overview/overview.component';
import { SupportListComponent } from './support-list/support-list.component';
import { AppComponent } from './app/app.component';
import { PortalComponent } from './portal/portal.component';
import { IntroCourseComponent } from './intro-course/intro-course.component';
import { HighlightDirective } from './intro-course/highlight.directive';
import { VivocloudComponent } from './vivocloud/vivocloud.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VIVOCloudRoutingModule,
    SharedModule,
    MatTabsModule,
    MatExpansionModule,
  ],
  declarations: [
    VivocloudComponent,
    OverviewComponent,
    SupportListComponent,
    AppComponent,
    PortalComponent,
    IntroCourseComponent,
    HighlightDirective
  ]
})
export class VIVOCloudModule { }
