import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@frontdesk/shared/shared.module';
import { SharedMaterialModule } from 'projects/dashboard/src/app/shared-material/shared-material.module';
import { SupportRoutingModule } from './support-routing.module';

import { TroubleShootingComponent } from './trouble-shooting/trouble-shooting.component';
import { WarrantyRmaComponent } from './warranty-rma/warranty-rma.component';
import { HomeComponent } from './home/home.component';
import { KnowledgeListComponent } from './knowledge/knowledge-list/knowledge-list.component';
import { KnowledgeContentComponent } from './knowledge/knowledge-content/knowledge-content.component';
import { OverviewComponent } from './overview/overview.component';
import { SearchBarService } from '@frontdesk/shared/services/search-bar.service';
import { ProductArticleComponent } from './product-article/product-article.component';
import { ProductArticleListComponent } from './product-article/product-article-list/product-article-list.component';
import { ProductArticlePageComponent } from './product-article/product-article-page/product-article-page.component';
import { ProductArticleService } from './product-article/product-article.service';
import { SupportBreadcrumbService } from './support-breadcrumb.service';
import { SupportCenterComponent } from './center/center.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedMaterialModule,
    SupportRoutingModule
  ],
  declarations: [
    TroubleShootingComponent,
    WarrantyRmaComponent,
    HomeComponent,
    KnowledgeListComponent,
    KnowledgeContentComponent,
    OverviewComponent,
    ProductArticleComponent,
    ProductArticleListComponent,
    ProductArticlePageComponent,
    SupportCenterComponent
  ],
  providers: [
    SearchBarService,
    ProductArticleService,
    SupportBreadcrumbService
  ]
})
export class SupportModule { }
