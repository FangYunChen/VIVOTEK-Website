import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { SortablejsOptions } from 'angular-sortablejs';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';

@Component({
  selector: 'vvtk-templates-type27',
  templateUrl: './templates-type27.component.html',
  styleUrls: ['./templates-type27.component.scss']
})
export class TemplatesType27Component implements OnInit {

  @Input() readOnly;
  @Input() path;
  @Input() isLoading;
  @Input() templateIndex;
  @Input() template: Template;

  @Output()
  upload = new EventEmitter<boolean>();

  groupOptionsCategory: SortablejsOptions = {
    group: 'groupCategory',
    handle: '.drag-handle-category',
    animation: 300
  };

  groupOptionsArticle: SortablejsOptions = {
    group: 'groupArticle',
    handle: '.drag-handle-article',
    animation: 300
  };

  groupOptionsVideo: SortablejsOptions = {
    group: 'groupVideo',
    handle: '.drag-handle-video',
    animation: 300
  };

  constructor(
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  addCategory(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(
      this.template.articleList.categories
    );
    clone.splice(idx, 0, {
      hideContent: false,
      title: '',
      articles: []
    });
    this.template.articleList.categories = clone;
  }

  deleteCategory(idx: number) {
    this.template.articleList.categories.splice(idx, 1);
  }

  addArticle(categoryIdx: number, articleIdx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(
      this.template.articleList.categories[categoryIdx].articles
    );
    clone.splice(articleIdx, 0, {
      hideContent: false,
      title: '',
      summary: '',
      htmlContent: '',
      videos: [{ videoUrl: '' }]
    });
    this.template.articleList.categories[categoryIdx].articles = clone;
  }

  deleteArticle(categoryIdx: number, articleIdx: number) {
    this.template.articleList.categories[categoryIdx].articles.splice(
      articleIdx,
      1
    );
  }

  addVideoUrl(categoryIdx: number, articleIdx: number, videoIdx: number) {
    const videos = this.template.articleList.categories[categoryIdx].articles[
      articleIdx
    ].videos;
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(videos);
    clone.splice(videoIdx, 0, '');
    this.template.articleList.categories[categoryIdx].articles[
      articleIdx
    ].videos = clone;
  }

  deleteVideoUrl(categoryIdx: number, articleIdx: number, videoIdx: number) {
    this.template.articleList.categories[categoryIdx].articles[
      articleIdx
    ].videos.splice(videoIdx, 1);
  }
}
