import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeatureArticleRoutingModule } from './feature-article-routing.module';
import { FeatureArticleComponent } from './feature-article/feature-article.component';
import { FeatureArticlePageComponent } from './feature-article-page/feature-article-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '@frontdesk/shared/shared.module';
import { SmartVcaComponent } from './smart-vca/smart-vca.component';
import { SmartMotionDetectionComponent } from './smart-motion-detection/smart-motion-detection.component';
import { SupportListComponent } from './smart-vca-support-list/support-list.component';
import { SmartMotionDetectionSupportListComponent } from './smart-motion-detection-support-list/smart-motion-detection-support-list.component';
import { RestrictedZoneDetectionSupportListComponent } from './restricted-zone-detection-support-list/restricted-zone-detection-support-list.component';
import { RestrictedZoneDetectionComponent } from './restricted-zone-detection/restricted-zone-detection.component';
import { ParkingViolationDetectionComponent } from './parking-violation-detection/parking-violation-detection.component';
import { ParkingViolationDetectionSupportListComponent } from './parking-violation-detection-support-list/parking-violation-detection-support-list.component';
import { SmartTrackingAdvancedSupportListComponent } from './smart-tracking-advanced-support-list/smart-tracking-advanced-support-list.component';
import { SmartTrackingAdvancedComponent } from './smart-tracking-advanced/smart-tracking-advanced.component';

@NgModule({
  imports: [CommonModule,
    FormsModule,
     SharedModule,
      FeatureArticleRoutingModule,
      MatTabsModule,
      MatExpansionModule,
    ],
  declarations: [FeatureArticleComponent,
     FeatureArticlePageComponent,
     SmartVcaComponent,
     SmartMotionDetectionComponent,
     SupportListComponent,
     SmartMotionDetectionSupportListComponent,
     RestrictedZoneDetectionSupportListComponent,
     RestrictedZoneDetectionComponent,
     ParkingViolationDetectionSupportListComponent,
     ParkingViolationDetectionComponent,
     SmartTrackingAdvancedSupportListComponent,
     SmartTrackingAdvancedComponent
    ]
})
export class FeatureArticleModule {}
