import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { VvtkPipeModule } from '../../../../shared/pipes/vvtk-pipe.module';
import { ImageRoutingModule } from './image-routing.module';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageContentComponent } from './image-content/image-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    VvtkPipeModule,
    ImageRoutingModule
  ],
  declarations: [
    ImageListComponent,
    ImageContentComponent
  ]
})
export class ImageModule { }
