import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { CompatibilitySuggestionListRoutingModule } from './compatibility-suggestion-list-routing.module';
import { SuggestionListComponent } from './suggestion-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SharedMaterialModule,
    CompatibilitySuggestionListRoutingModule
  ],
  declarations: [
    SuggestionListComponent
  ]
})
export class CompatibilitySuggestionListModule { }
