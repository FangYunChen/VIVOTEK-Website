import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedMaterialModule } from 'projects/dashboard/src/app/shared-material/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SmartTrackingAdvancedRoutingModule } from './smart-tracking-advanced-routing.module';
import { SmartTrackingAdvancedListComponent } from './smart-tracking-advanced-list/smart-tracking-advanced-list.component';
import { SmartTrackingAdvancedContentComponent } from './smart-tracking-advanced-content/smart-tracking-advanced-content.component';

@NgModule({
  imports: [
    CommonModule,
    SmartTrackingAdvancedRoutingModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SortablejsModule
  ],
  declarations: [
    SmartTrackingAdvancedContentComponent,
    SmartTrackingAdvancedListComponent,
  ]
})
export class SmartTrackingAdvancedModule { }
