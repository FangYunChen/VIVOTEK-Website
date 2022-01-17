import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { VvtkPipeModule } from '../../../../shared/pipes/vvtk-pipe.module';
import { ImageTypeRoutingModule } from './image-type-routing.module';
import { ImageTypeListComponent } from './image-type-list/image-type-list.component';
import { ImageTypeContentComponent } from './image-type-content/image-type-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    VvtkPipeModule,
    ImageTypeRoutingModule
  ],
  declarations: [
    ImageTypeListComponent,
    ImageTypeContentComponent
  ]
})
export class ImageTypeModule { }
