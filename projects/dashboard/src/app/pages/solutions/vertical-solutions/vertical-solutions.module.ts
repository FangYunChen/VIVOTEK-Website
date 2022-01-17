import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VerticalSolutionsRoutingModule } from './vertical-solutions-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { SortablejsModule } from 'angular-sortablejs';
import { RetailComponent } from './retail/retail.component';
import { TransportationListComponent } from './transportation/transportation-list/transportation-list.component';
import { TransportationContentComponent } from './transportation/transportation-content/transportation-content.component';
import { SecurityComponent } from './security/security.component';
import { BusinessIntelligenceComponent } from './business-intelligence/business-intelligence.component';
import { FactorySecurityComponent } from './factory-security/factory-security.component';
import { ProductivivyAndSafetyComponent } from './productivity-and-safety/productivity-and-safety.component';
import { MultiSiteManagementComponent } from './multi-site-management/multi-site-management.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    VerticalSolutionsRoutingModule,
    SharedModule,
    SharedMaterialModule,
    SortablejsModule
  ],
  declarations: [
    RetailComponent,
    TransportationListComponent,
    TransportationContentComponent,
    SecurityComponent,
    BusinessIntelligenceComponent,
    FactorySecurityComponent,
    ProductivivyAndSafetyComponent,
    MultiSiteManagementComponent
  ]
})
export class VerticalSolutionsModule { }
