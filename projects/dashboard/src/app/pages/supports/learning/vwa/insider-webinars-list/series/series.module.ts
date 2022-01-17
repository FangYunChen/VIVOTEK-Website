import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../../../shared-material/shared-material.module';
import { SeriesRoutingModule } from './series-routing.module';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesContentComponent } from './series-content/series-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SortablejsModule,
    SharedModule,
    SharedMaterialModule,
    SeriesRoutingModule
  ],
  declarations: [
    SeriesListComponent,
    SeriesContentComponent
  ]
})
export class SeriesModule { }
