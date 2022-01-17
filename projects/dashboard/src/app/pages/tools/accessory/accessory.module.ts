import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessoryRoutingModule } from './accessory-routing.module';
import { AccessoryListComponent } from './accessory-list/accessory-list.component';
import { AccessoryContentComponent } from './accessory-content/accessory-content.component';
import { AccessoryCombinationContentComponent } from './accessory-combination-content/accessory-combination-content.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { SortablejsModule } from 'angular-sortablejs';
import { AccessoryCombinationListComponent } from './accessory-combination-list/accessory-combination-list.component';

@NgModule({
  declarations: [AccessoryListComponent,
    AccessoryContentComponent,
    AccessoryCombinationContentComponent,
    AccessoryCombinationListComponent],
  imports: [
    CommonModule,
    AccessoryRoutingModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    SortablejsModule
  ]
})
export class AccessoryModule { }
