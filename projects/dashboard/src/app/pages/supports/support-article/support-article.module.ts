import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { SupportArticleRoutingModule } from './support-article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleContentComponent } from './article-content/article-content.component';
import { SortablejsModule } from 'angular-sortablejs';
import { OverviewPageComponent } from './overview-page/overview-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    SupportArticleRoutingModule,
    SortablejsModule
  ],
  declarations: [
    OverviewPageComponent,
    ArticleListComponent,
    ArticleContentComponent
  ]
})
export class SupportArticleModule { }
