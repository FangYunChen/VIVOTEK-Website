import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPagesRoutingModule } from './landing-pages-routing.module';
import { TaaComponent } from './taa/taa.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedMaterialModule } from '../../shared-material/shared-material.module';
import { OssCategoryComponent } from './oss/oss-category/oss-category.component';
import { OssCategoryCreateComponent } from './oss/oss-category-create/oss-category-create.component';
import { OssCategoryDeleteConfirmComponent } from './oss/oss-category-delete-confirm/oss-category-delete-confirm.component';
import { OssModelsComponent } from './oss/oss-models/oss-models.component';
import { OssModelCreateComponent } from './oss/oss-model-create/oss-model-create.component';
import { OssModelDetailComponent } from './oss/oss-model-detail/oss-model-detail.component';
import { AmazonKinesisVideoStreamsComponent } from './amazon-kinesis-video-streams/amazon-kinesis-video-streams.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { IntelligentVCAComponent } from './intelligent-vca/intelligent-vca.component';
import { NDAAComponent } from './ndaa/ndaa.component';
import { OnlineTrainingStepComponent } from './online-training-step/online-training-step.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { KnowAboutCybersecurityComponent } from './know-about-cybersecurity/know-about-cybersecurity.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LandingPagesRoutingModule,
    SortablejsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule
  ],
  declarations: [
    TaaComponent,
    OssCategoryDeleteConfirmComponent,
    OssCategoryComponent,
    OssCategoryCreateComponent,
    OssModelsComponent,
    OssModelDetailComponent,
    OssModelCreateComponent,
    AmazonKinesisVideoStreamsComponent,
    DownloadsComponent,
    IntelligentVCAComponent,
    NDAAComponent,
    OnlineTrainingStepComponent,
    ECommerceComponent,
    KnowAboutCybersecurityComponent
  ],
  entryComponents: [OssCategoryDeleteConfirmComponent]
})
export class LandingPagesModule { }
