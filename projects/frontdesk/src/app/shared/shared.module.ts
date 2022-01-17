import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatDialogModule, MatTabsModule, MatFormFieldModule, MatInputModule,
  MatRippleModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatButtonModule,
  MatGridListModule, MatExpansionModule, MatListModule, MatToolbarModule, MatRadioModule, MatCheckboxModule,
  MatSlideToggleModule, MatTooltipModule, MatCardModule, MatStepperModule, MatPaginatorIntl
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';

import { AComponent } from './components/a/a.component';
import { CardComponent } from './components/card/card.component';
import { CardTextComponent } from './components/card-text/card-text.component';
import { DownloadListComponent } from './components/download-list/download-list.component';
import { FullSliderComponent } from './components/full-slider/full-slider.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModelCollapseComponent } from './components/model-collapse/model-collapse.component';
import { ModelGalleryComponent } from './components/model-gallery/model-gallery.component';
import { ModelDownloadComponent } from './components/model/model-download/model-download.component';
import { ModelImgBgComponent } from './components/model/model-img-bg/model-img-bg.component';
import { ModelImgTextComponent } from './components/model/model-img-text/model-img-text.component';
import { ModelSelectorComponent } from './components/model/model-selector/model-selector.component';
import { ModelTableComponent } from './components/model/model-table/model-table.component';
import { ModelTextComponent } from './components/model/model-text/model-text.component';
import { ModelRichTextComponent } from './components/model/model-rich-text/model-rich-text.component';
import { ModelThreeCardsComponent } from './components/model/model-three-cards/model-three-cards.component';
import { ModelFourCardsTextComponent } from './components/model/model-four-cards-text/model-four-cards-text.component';
import { ModelThreeCircleComponent } from './components/model/model-three-circle/model-three-circle.component';
import { ModelIconHorizontalComponent } from './components/model/model-icon-horizontal/model-icon-horizontal.component';
import { ModelIconVerticalComponent } from './components/model/model-icon-vertical/model-icon-vertical.component';
import { ModelTwoBlockComponent } from './components/model/model-two-block/model-two-block.component';
import { ModelListItemComponent } from './components/model/model-list-item/model-list-item.component';
import { ModelImgCarouselComponent } from './components/model/model-img-carousel/model-img-carousel.component';
import { ModelImgCarouselDialogComponent } from './components/model/model-img-carousel-dialog/model-img-carousel-dialog.component';
import { ModelVideoListComponent } from './components/model/model-video-list/model-video-list.component';
import { ModelTitleImagesComponent } from './components/model/model-title-images/model-title-images.component';
import { ModelBannerComponent } from './components/model/model-banner/model-banner.component';
import { ModelMutipleBannerComponent } from './components/model/model-mutiple-banner/model-mutiple-banner.component';
// tslint:disable-next-line:max-line-length
import { ModelMutipleBannerTwoBlockComponent } from './components/model/model-mutiple-banner-two-block/model-mutiple-banner-two-block.component';
import { PopupComponent } from './components/popup/popup.component';
import { AlertComponent } from './components/alert/alert.component';
import { ShareComponent } from './components/share/share.component';
import { TabSliderComponent } from './components/tab-slider/tab-slider.component';
import { TextCardComponent } from './components/text-card/text-card.component';
import { ThreeBannerComponent } from './components/three-banner/three-banner.component';
import { MutipleBannerComponent } from './components/mutiple-banner/mutiple-banner.component';
import { MutipleBannerTwoBlockComponent } from './components/mutiple-banner-two-block/mutiple-banner-two-block.component';
import { ThreeCardsComponent } from './components/three-cards/three-cards.component';
import { TopBannerComponent } from './components/top-banner/top-banner.component';
import { CustomPathPipe } from './pipes/custom-path.pipe';
import { I18nPipe } from './pipes/i18n.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { ModelTwoBlockVerticalComponent } from './components/model/model-two-block-vertical/model-two-block-vertical.component';
import { ModelThreePanelComponent } from './components/model/model-three-panel/model-three-panel.component';
import { PanelComponent } from './components/panel/panel.component';
import { ModelTwoRichTextComponent } from './components/model/model-two-rich-text/model-two-rich-text.component';
import { MccColorPickerModule } from 'material-community-components';
import { ModelListLinkItemComponent } from './components/model/model-list-link-item/model-list-link-item.component';
import { ModelEventLocationComponent } from './components/model/model-event-location/model-event-location.component';
import { SIAPartnerListComponent } from './components/sia-partner-list/sia-partner-list.component';
import { ModelArticleManagementComponent } from './components/model/model-article-management/model-article-management.component';
import { HighlightDirective } from './components/model/model-article-management/highlight.directive';
import { NestedNavListComponent } from './components/nested-nav-list/nested-nav-list.component';
import { ModelGridListItemComponent } from './components/model-grid-list-item/model-grid-list-item.component';
import { LabelComponent } from './components/label/label.component';
import { AnchorBarComponent } from './components/anchor-bar/anchor-bar.component';
import { FixedTopDirective } from './directives/fixed-top.directive';
import { GoBackDirective } from './directives/go-back.directive';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { LinkComponent } from './components/link/link.component';
import { ModelContentImageComponent } from './components/model/model-content-image/model-content-image.component';
// tslint:disable-next-line:max-line-length
import { ProductModelSpecialHighlightComponent } from './components/model/product-model-special-highlight/product-model-special-highlight.component';
import { ModelSpecificationsComponent } from './components/model-specifications/model-specifications.component';
import { ModelNestedSpecificationComponent } from './components/model-nested-specification/model-nested-specification.component';
import { ModelTabVideosComponent } from './components/model/model-tab-videos/model-tab-videos.component';
import { BreakLineTagPipe } from '@frontdesk/shared/pipes/break-line-tag.pipe';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchBarService } from './services/search-bar.service';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { InputContainerComponent } from './components/input-container/input-container.component';
import { DefaultProductImagePipe } from './pipes/default-product-image.pipe';
import { LinkGalleryComponent } from './components/link-gallery/link-gallery.component';
import { GoTopDirective } from './directives/go-top.directive';
import { ModelTableDownloadComponent } from './components/model-table-download/model-table-download.component';
import { MatPaginatorIntlService } from './services/mat-paginator-intl.service';
import { I18nService } from '@frontdesk/core/services';
import { ModelTableRevenueComponent } from './components/model/model-table-revenue/model-table-revenue.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatDialogModule,
    MatTabsModule,
    LayoutModule,
    MccColorPickerModule.forRoot({
      empty_color: 'transparent'
    }),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatCardModule,
    MatStepperModule
  ],
  declarations: [
    I18nPipe,
    CustomPathPipe,
    SafePipe,
    AComponent,
    CardComponent,
    CardTextComponent,
    DownloadListComponent,
    FullSliderComponent,
    LoadingComponent,
    ModelDownloadComponent,
    ModelImgBgComponent,
    ModelImgTextComponent,
    ModelSelectorComponent,
    ModelTableComponent,
    ModelTableRevenueComponent,
    ModelTextComponent,
    ModelRichTextComponent,
    ModelThreeCardsComponent,
    ModelFourCardsTextComponent,
    ModelThreeCircleComponent,
    ModelIconHorizontalComponent,
    ModelIconVerticalComponent,
    ModelTwoBlockComponent,
    ModelListItemComponent,
    ModelImgCarouselComponent,
    ModelImgCarouselDialogComponent,
    ModelVideoListComponent,
    ModelTitleImagesComponent,
    ModelBannerComponent,
    ModelMutipleBannerComponent,
    ModelMutipleBannerTwoBlockComponent,
    ModelEventLocationComponent,
    ModelCollapseComponent,
    ModelGalleryComponent,
    PopupComponent,
    AlertComponent,
    ShareComponent,
    TabSliderComponent,
    TextCardComponent,
    ThreeBannerComponent,
    MutipleBannerComponent,
    MutipleBannerTwoBlockComponent,
    ThreeCardsComponent,
    TopBannerComponent,
    ModelTwoBlockVerticalComponent,
    ModelThreePanelComponent,
    PanelComponent,
    ModelTwoRichTextComponent,
    ModelListLinkItemComponent,
    SIAPartnerListComponent,
    ModelArticleManagementComponent,
    HighlightDirective,
    NestedNavListComponent,
    ModelGridListItemComponent,
    LabelComponent,
    AnchorBarComponent,
    FixedTopDirective,
    GoBackDirective,
    PhotoGalleryComponent,
    LinkComponent,
    ModelContentImageComponent,
    ProductModelSpecialHighlightComponent,
    ModelTableDownloadComponent,
    ModelSpecificationsComponent,
    ModelNestedSpecificationComponent,
    ModelTabVideosComponent,
    BreakLineTagPipe,
    DefaultProductImagePipe,
    DynamicTableComponent,
    SearchBarComponent,
    LanguageSelectorComponent,
    InputContainerComponent,
    LinkGalleryComponent,
    GoTopDirective,
  ],
  exports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatCardModule,
    MatStepperModule,
    I18nPipe,
    CustomPathPipe,
    SafePipe,
    AComponent,
    CardComponent,
    CardTextComponent,
    DownloadListComponent,
    FullSliderComponent,
    LoadingComponent,
    ModelDownloadComponent,
    ModelImgBgComponent,
    ModelImgTextComponent,
    ModelSelectorComponent,
    ModelTableComponent,
    ModelTableRevenueComponent,
    ModelTextComponent,
    ModelRichTextComponent,
    ModelThreeCardsComponent,
    ModelFourCardsTextComponent,
    ModelThreeCircleComponent,
    ModelIconHorizontalComponent,
    ModelIconVerticalComponent,
    ModelTwoBlockComponent,
    ModelListItemComponent,
    ModelImgCarouselComponent,
    ModelImgCarouselDialogComponent,
    ModelVideoListComponent,
    ModelTitleImagesComponent,
    ModelBannerComponent,
    ModelMutipleBannerComponent,
    ModelMutipleBannerTwoBlockComponent,
    ModelEventLocationComponent,
    ModelCollapseComponent,
    ModelGalleryComponent,
    PopupComponent,
    AlertComponent,
    ShareComponent,
    TabSliderComponent,
    TextCardComponent,
    ThreeBannerComponent,
    MutipleBannerComponent,
    MutipleBannerTwoBlockComponent,
    ThreeCardsComponent,
    TopBannerComponent,
    ModelTwoBlockVerticalComponent,
    ModelThreePanelComponent,
    PanelComponent,
    ModelTwoRichTextComponent,
    ModelListLinkItemComponent,
    SIAPartnerListComponent,
    ModelArticleManagementComponent,
    HighlightDirective,
    NestedNavListComponent,
    ModelGridListItemComponent,
    LabelComponent,
    AnchorBarComponent,
    FixedTopDirective,
    GoBackDirective,
    PhotoGalleryComponent,
    LinkComponent,
    ModelContentImageComponent,
    ProductModelSpecialHighlightComponent,
    ModelTableDownloadComponent,
    ModelSpecificationsComponent,
    ModelNestedSpecificationComponent,
    ModelTabVideosComponent,
    BreakLineTagPipe,
    DefaultProductImagePipe,
    DynamicTableComponent,
    SearchBarComponent,
    LanguageSelectorComponent,
    InputContainerComponent,
    LinkGalleryComponent,
    GoTopDirective,
  ],
  providers: [DatePipe, SearchBarService,
    { provide: MatPaginatorIntl, deps: [I18nService],
      useFactory: (i18nService: I18nService) => new MatPaginatorIntlService(i18nService).getPaginatorIntl()
    }],
  entryComponents: [ModelImgCarouselDialogComponent]
})
export class SharedModule { }


