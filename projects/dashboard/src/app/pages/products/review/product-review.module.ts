import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { ProductReviewRoutingModule } from './product-review-routing.module';
import { MemberComponent } from './member/member.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MemberContentComponent } from './member/member-content/member-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    FlexLayoutModule,
    SharedModule,
    SharedMaterialModule,
    ProductReviewRoutingModule
  ],
  declarations: [
    MemberComponent,
    ProductListComponent,
    MemberContentComponent
  ],
  entryComponents: [
    MemberContentComponent
  ]
})
export class ProductReviewModule { }
