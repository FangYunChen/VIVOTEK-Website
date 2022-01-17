import { OssCategoryCreateComponent } from './oss/oss-category-create/oss-category-create.component';
import { OssModelCreateComponent } from './oss/oss-model-create/oss-model-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaaComponent } from './taa/taa.component';
import { OssModelDetailComponent } from './oss/oss-model-detail/oss-model-detail.component';
import { OssModelsComponent } from './oss/oss-models/oss-models.component';
import { OssCategoryComponent } from './oss/oss-category/oss-category.component';
import { AmazonKinesisVideoStreamsComponent } from './amazon-kinesis-video-streams/amazon-kinesis-video-streams.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { IntelligentVCAComponent } from './intelligent-vca/intelligent-vca.component';
import { NDAAComponent } from './ndaa/ndaa.component';
import { OnlineTrainingStepComponent } from './online-training-step/online-training-step.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { KnowAboutCybersecurityComponent } from './know-about-cybersecurity/know-about-cybersecurity.component';

const routes: Routes = [
  {
    path: 'oss/model/create',
    component: OssModelCreateComponent
  },
  {
    path: 'oss/model/:id',
    component: OssModelDetailComponent
  },
  {
    path: 'oss/model',
    component: OssModelsComponent
  },
  {
    path: 'oss/category/create',
    component: OssCategoryCreateComponent
  },
  {
    path: 'oss/category',
    component: OssCategoryComponent
  },
  {
    path: 'taa',
    component: TaaComponent
  },
  {
    path: 'amazon-kinesis-video-streams',
    component: AmazonKinesisVideoStreamsComponent
  },
  {
    path: 'downloads',
    component: DownloadsComponent
  },
  {
    path: 'intelligent-vca',
    component: IntelligentVCAComponent
  },
  {
    path: 'ndaa',
    component: NDAAComponent
  },
  {
    path: 'online-training-step',
    component: OnlineTrainingStepComponent
  },
  {
    path: 'e-commerce',
    component: ECommerceComponent
  },
  {
    path: 'what-you-should-know-about-cybersecurity',
    component: KnowAboutCybersecurityComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPagesRoutingModule { }
