import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SoftwareRoutingModule } from './software-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { Vast2ListComponent } from './vast2/vast2-list/vast2-list.component';
import { Vast2ContentComponent } from './vast2/vast2-content/vast2-content.component';
import { ShepherdListComponent } from './shepherd/shepherd-list/shepherd-list.component';
import { ShepherdContentComponent } from './shepherd/shepherd-content/shepherd-content.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    SoftwareRoutingModule,
    SharedModule,
    SharedMaterialModule,
    SortablejsModule
  ],
  declarations: [
    Vast2ListComponent,
    Vast2ContentComponent,
    ShepherdListComponent,
    ShepherdContentComponent
  ]
})
export class SoftwareModule { }
