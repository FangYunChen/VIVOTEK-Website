import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'vwa',
    loadChildren: './vwa/vwa.module#VWAModule'
  },
  {
    path: 'feature-article',
    loadChildren:
      './feature-article/feature-article.module#FeatureArticleModule'
  },
  {
    path: 'smart-vca',
    loadChildren:
      './smart-vca/smart-vca.module#SmartVcaModule'
  },
  {
    path: 'smart-motion-detection',
    loadChildren:
      './smart-motion-detection/smart-motion-detection.module#SmartMotionDetectionModule'
  },
  {
    path: 'parking-violation-detection',
    loadChildren:
      './parking-violation-detection/parking-violation-detection.module#ParkingViolationDetectionModule'
  },
  {
    path: 'restricted-zone-detection',
    loadChildren:
      './restricted-zone-detection/restricted-zone-detection.module#RestrictedZoneDetectionModule'
  },
  {
    path: 'smart-tracking-advanced',
    loadChildren:
      './smart-tracking-advanced/smart-tracking-advanced.module#SmartTrackingAdvancedModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
