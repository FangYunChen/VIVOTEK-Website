import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../../../shared-material/shared-material.module';
import { LanguageRoutingModule } from './language-routing.module';
import { LanguageListComponent } from './language-list/language-list.component';
import { LanguageContentComponent } from './language-content/language-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SortablejsModule,
    SharedModule,
    SharedMaterialModule,
    LanguageRoutingModule
  ],
  declarations: [
    LanguageListComponent,
    LanguageContentComponent
  ]
})
export class LanguageModule { }
