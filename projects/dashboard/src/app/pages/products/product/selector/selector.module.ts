import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { SelectorRoutingModule } from './selector-routing.module';
import { SelectorComponent } from './selector.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    SelectorRoutingModule
  ],
  declarations: [
    SelectorComponent
  ]
})
export class SelectorModule { }
