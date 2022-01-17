import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';
import { CompatibilityFeatureRoutingModule } from './compatibility-feature-routing.module';
import { FeatureComponent } from './feature.component';
import { DropdownListService } from '../services/dropdown-list.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SortablejsModule,
    SharedModule,
    SharedMaterialModule,
    CompatibilityFeatureRoutingModule
  ],
  declarations: [
    FeatureComponent,
  ],
  providers: [DropdownListService]
})
export class CompatibilityFeatureModule { }
