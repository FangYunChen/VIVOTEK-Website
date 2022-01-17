import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../../../shared-material/shared-material.module';
import { SmartVcaModelLicenseRoutingModule } from './smart-vca-model-license-routing.module';
import { ModelLicenseListComponent } from './model-license-list/model-license-list.component';
import { ModelLicenseContentComponent } from './model-license-content/model-license-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SortablejsModule,
    SharedModule,
    SharedMaterialModule,
    SmartVcaModelLicenseRoutingModule
  ],
  declarations: [
    ModelLicenseListComponent,
    ModelLicenseContentComponent
  ]
})
export class SmartVcaModelLicenseModule { }
