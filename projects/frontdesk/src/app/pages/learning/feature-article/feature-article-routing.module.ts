import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureArticleComponent } from './feature-article/feature-article.component';
import { FeatureArticlePageComponent } from './feature-article-page/feature-article-page.component';
import { SmartVcaComponent } from './smart-vca/smart-vca.component';
import { SmartMotionDetectionComponent } from './smart-motion-detection/smart-motion-detection.component';
import { SupportListComponent } from './smart-vca-support-list/support-list.component';
import { SmartMotionDetectionSupportListComponent } from './smart-motion-detection-support-list/smart-motion-detection-support-list.component';
import { RestrictedZoneDetectionSupportListComponent } from './restricted-zone-detection-support-list/restricted-zone-detection-support-list.component';
import { RestrictedZoneDetectionComponent } from './restricted-zone-detection/restricted-zone-detection.component';
import { ParkingViolationDetectionSupportListComponent } from './parking-violation-detection-support-list/parking-violation-detection-support-list.component';
import { ParkingViolationDetectionComponent } from './parking-violation-detection/parking-violation-detection.component';
import { SmartTrackingAdvancedSupportListComponent } from './smart-tracking-advanced-support-list/smart-tracking-advanced-support-list.component';
import { SmartTrackingAdvancedComponent } from './smart-tracking-advanced/smart-tracking-advanced.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureArticleComponent
  },
  {
    path: 'smart-vca',
    component: SmartVcaComponent
  },
  {
    path: 'smart-vca/support-list',
    component: SupportListComponent
  },
  {
    path: 'smart-motion-detection/support-list',
    component: SmartMotionDetectionSupportListComponent
  },
  {
    path: 'smart-motion-detection',
    component: SmartMotionDetectionComponent
  },
  {
    path: 'restricted-zone-detection/support-list',
    component: RestrictedZoneDetectionSupportListComponent
  },
  {
    path: 'restricted-zone-detection',
    component: RestrictedZoneDetectionComponent
  },
  {
    path: 'parking-violation-detection/support-list',
    component: ParkingViolationDetectionSupportListComponent
  },
  {
    path: 'parking-violation-detection',
    component: ParkingViolationDetectionComponent
  },
  {
    path: 'smart-tracking-advanced/support-list',
    component: SmartTrackingAdvancedSupportListComponent
  },
  {
    path: 'smart-tracking-advanced',
    component: SmartTrackingAdvancedComponent
  },
  {
    path: ':id',
    component: FeatureArticlePageComponent
  },
  {
    path: ':id/:title',
    component: FeatureArticlePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureArticleRoutingModule { }
