import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../../../shared-material/shared-material.module';
import { RestrictedZoneDetectionPackageRoutingModule } from './restricted-zone-detection-package-routing.module';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageContentComponent } from './package-content/package-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SortablejsModule,
    SharedModule,
    SharedMaterialModule,
    RestrictedZoneDetectionPackageRoutingModule
  ],
  declarations: [
    PackageListComponent,
    PackageContentComponent
  ]
})
export class RestrictedZoneDetectionPackageModule { }
