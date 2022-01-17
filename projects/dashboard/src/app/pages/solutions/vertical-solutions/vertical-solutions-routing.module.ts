import { MultiSiteManagementComponent } from './multi-site-management/multi-site-management.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetailComponent } from './retail/retail.component';
import { TransportationListComponent } from './transportation/transportation-list/transportation-list.component';
import { TransportationContentComponent } from './transportation/transportation-content/transportation-content.component';
import { SecurityComponent } from './security/security.component';
import { BusinessIntelligenceComponent } from './business-intelligence/business-intelligence.component';
import { FactorySecurityComponent } from './factory-security/factory-security.component';
import { ProductivivyAndSafetyComponent } from './productivity-and-safety/productivity-and-safety.component';

const routes: Routes = [
  {
    path: 'retail',
    component: RetailComponent
  },
  {
    path: 'security',
    component: SecurityComponent
  },
  {
    path: 'business-intelligence',
    component: BusinessIntelligenceComponent
  },
  {
    path: 'transportation',
    component: TransportationListComponent
  },
  {
    path: 'transportation/:id',
    component: TransportationContentComponent
  },
  {
    path: 'factory-security',
    component: FactorySecurityComponent
  },
  {
    path: 'productivity-and-safety',
    component: ProductivivyAndSafetyComponent
  },
  {
    path: 'multi-site_management',
    component: MultiSiteManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerticalSolutionsRoutingModule { }
