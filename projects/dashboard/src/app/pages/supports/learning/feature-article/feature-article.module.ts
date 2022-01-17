import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureArticleRoutingModule } from './feature-article-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';

import { SortablejsModule } from 'angular-sortablejs';
import { FeatureArticleListComponent } from './feature-article-list/feature-article-list.component';
import { FeatureArticleContentComponent } from './feature-article-content/feature-article-content.component';
import { MomentModule } from 'ngx-moment';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SharedMaterialModule,
    SortablejsModule,
    MomentModule,
    FlexLayoutModule,
    FeatureArticleRoutingModule
  ],
  declarations: [FeatureArticleListComponent, FeatureArticleContentComponent]
})
export class FeatureArticleModule {}
