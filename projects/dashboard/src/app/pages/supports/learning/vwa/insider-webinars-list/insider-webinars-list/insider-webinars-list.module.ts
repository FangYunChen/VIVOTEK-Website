import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InsiderWebinarsListRoutingModule } from './insider-webinars-list-routing.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../../../shared-material/shared-material.module';
import { VvtkPipeModule } from '../../../../../../shared/pipes/vvtk-pipe.module';
import { InsiderWebinarsListComponent } from './insider-webinars-list/insider-webinars-list.component';
import { InsiderWebinarsContentComponent } from './insider-webinars-content/insider-webinars-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    InsiderWebinarsListRoutingModule,
    SharedModule,
    SharedMaterialModule,
    VvtkPipeModule
  ],
  declarations: [
    InsiderWebinarsListComponent,
    InsiderWebinarsContentComponent
  ]
})
export class InsiderWebinarsListModule { }
