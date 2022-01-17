import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SortablejsModule } from 'angular-sortablejs';
import { MomentModule } from 'ngx-moment';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { VvtkPipeModule } from './pipes/vvtk-pipe.module';
import { AlbumComponent } from './components/album/album.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { InputContainerComponent } from './components/input-container/input-container.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ReviewPageContentComponent } from './components/review-page/review-page-content/review-page-content.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { TableComponent } from './components/table/table.component';
import { WysiwygComponent } from './components/wysiwyg/wysiwyg.component';
import { TemplatePageComponent } from './components/template-page/template-page.component';
import { SubTemplatePageComponent } from './components/sub-template-page/sub-template-page.component';
import { DynamicTemplatePageComponent } from './components/dynamic-template-page/dynamic-template-page.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { TemplatesType1Component } from './components/templates/templates-type1/templates-type1.component';
import { TemplatesType2Component } from './components/templates/templates-type2/templates-type2.component';
import { TemplatesType3Component } from './components/templates/templates-type3/templates-type3.component';
import { TemplatesType4Component } from './components/templates/templates-type4/templates-type4.component';
import { TemplatesType5Component } from './components/templates/templates-type5/templates-type5.component';
import { TemplatesType6Component } from './components/templates/templates-type6/templates-type6.component';
import { TemplatesType9Component } from './components/templates/templates-type9/templates-type9.component';
import { TemplatesType11Component } from './components/templates/templates-type11/templates-type11.component';
import { TemplatesType12Component } from './components/templates/templates-type12/templates-type12.component';
import { TemplatesType14Component } from './components/templates/templates-type14/templates-type14.component';
import { TemplatesType15Component } from './components/templates/templates-type15/templates-type15.component';
import { TemplatesType16Component } from './components/templates/templates-type16/templates-type16.component';
import { TemplatesType17Component } from './components/templates/templates-type17/templates-type17.component';
import { TemplatesType20Component } from './components/templates/templates-type20/templates-type20.component';
import { TemplatesType21Component } from './components/templates/templates-type21/templates-type21.component';
import { TemplatesType22Component } from './components/templates/templates-type22/templates-type22.component';
import { TemplatesType23Component } from './components/templates/templates-type23/templates-type23.component';
import { TemplatesType24Component } from './components/templates/templates-type24/templates-type24.component';
import { TemplatesType25Component } from './components/templates/templates-type25/templates-type25.component';
import { TemplatesType26Component } from './components/templates/templates-type26/templates-type26.component';
import { TemplatesType27Component } from './components/templates/templates-type27/templates-type27.component';
import { TemplatesType28Component } from './components/templates/templates-type28/templates-type28.component';
import { TemplatesType29Component } from './components/templates/templates-type29/templates-type29.component';
import { TemplatesType201Component } from './components/templates/templates-type201/templates-type201.component';
import { TemplatesType202Component } from './components/templates/templates-type202/templates-type202.component';
import { SubSpecificationComponent } from './components/templates/templates-type202/sub-specification/sub-specification.component';
import { MccColorPickerModule } from 'material-community-components';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { IconSelectorComponent } from './components/icon-selector/icon-selector.component';
import { ProductSelectorComponent } from './components/product-selector/product-selector.component';
import { DynamicComponentHostDirective } from './directives/dynamic-component-host.directive';
import { SubmitReviewComponent } from './components/submit-review/submit-review.component';
import { CheckListDialogComponent } from './components/check-list-dialog/check-list-dialog.component';
import { ReviewDialogComponent } from './components/review-dialog/review-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MomentModule,
    VvtkPipeModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    SharedMaterialModule,
    SortablejsModule,
    MccColorPickerModule.forRoot({
      empty_color: 'transparent'
    }),
    ReactiveFormsModule
  ],
  declarations: [
    LanguageSelectorComponent,
    WysiwygComponent,
    ConfirmComponent,
    DeleteConfirmComponent,
    InputContainerComponent,
    LoaderComponent,
    TableComponent,
    TemplatePageComponent,
    SubTemplatePageComponent,
    DynamicTemplatePageComponent,
    TemplatesComponent,
    TemplatesType1Component,
    TemplatesType2Component,
    TemplatesType3Component,
    TemplatesType4Component,
    TemplatesType5Component,
    TemplatesType6Component,
    TemplatesType9Component,
    TemplatesType11Component,
    TemplatesType12Component,
    TemplatesType14Component,
    TemplatesType15Component,
    TemplatesType16Component,
    TemplatesType17Component,
    TemplatesType20Component,
    TemplatesType21Component,
    TemplatesType22Component,
    TemplatesType23Component,
    TemplatesType24Component,
    TemplatesType25Component,
    TemplatesType26Component,
    TemplatesType27Component,
    TemplatesType28Component,
    TemplatesType29Component,
    TemplatesType201Component,
    TemplatesType202Component,
    SubSpecificationComponent,
    ReviewPageComponent,
    ReviewPageContentComponent,
    AlbumComponent,
    ImageSelectorComponent,
    IconSelectorComponent,
    ProductSelectorComponent,
    DynamicComponentHostDirective,
    SubmitReviewComponent,
    CheckListDialogComponent,
    ReviewDialogComponent,
  ],
  exports: [
    LanguageSelectorComponent,
    WysiwygComponent,
    ConfirmComponent,
    DeleteConfirmComponent,
    InputContainerComponent,
    LoaderComponent,
    TableComponent,
    TemplatePageComponent,
    SubTemplatePageComponent,
    DynamicTemplatePageComponent,
    TemplatesComponent,
    TemplatesType1Component,
    TemplatesType2Component,
    TemplatesType3Component,
    TemplatesType4Component,
    TemplatesType5Component,
    TemplatesType6Component,
    TemplatesType9Component,
    TemplatesType11Component,
    TemplatesType12Component,
    TemplatesType14Component,
    TemplatesType15Component,
    TemplatesType16Component,
    TemplatesType17Component,
    TemplatesType20Component,
    TemplatesType21Component,
    TemplatesType22Component,
    TemplatesType23Component,
    TemplatesType24Component,
    TemplatesType25Component,
    TemplatesType26Component,
    TemplatesType27Component,
    TemplatesType28Component,
    TemplatesType29Component,
    TemplatesType201Component,
    TemplatesType202Component,
    SubSpecificationComponent,
    ReviewPageComponent,
    ReviewPageContentComponent,
    AlbumComponent,
    VvtkPipeModule,
    ImageSelectorComponent,
    IconSelectorComponent,
    ProductSelectorComponent,
    DynamicComponentHostDirective,
    SubmitReviewComponent,
    CheckListDialogComponent,
    ReviewDialogComponent,
  ],
})
export class SharedModule { }
