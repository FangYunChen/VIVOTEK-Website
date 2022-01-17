import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportArticleTagRoutingModule } from './/support-article-tag-routing.module';
import { TagComponent } from './components/tag.component';
import { SharedModule } from 'projects/dashboard/src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from 'projects/dashboard/src/app/shared-material/shared-material.module';
import { SupportArticleTagEditorComponent } from './components/support-article-tag-editor/support-article-tag-editor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SupportArticleTagRoutingModule,
    SharedModule,
    FlexLayoutModule,
    SharedMaterialModule,
    FormsModule
  ],
  exports: [
    FormsModule
  ],
  entryComponents: [
    SupportArticleTagEditorComponent
  ],
  declarations: [TagComponent, SupportArticleTagEditorComponent]
})
export class SupportArticleTagModule { }
