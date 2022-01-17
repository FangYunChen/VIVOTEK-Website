import { Component, Input, OnInit } from '@angular/core';
import { Template, Tab, Video } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'vvtk-templates-type29',
  templateUrl: './templates-type29.component.html',
  styleUrls: ['./templates-type29.component.scss']
})
export class TemplatesType29Component implements OnInit {

  @Input() readOnly;
  @Input() templateIndex;
  @Input() template: Template;

  groupOptionsTab: SortablejsOptions = {
    group: 'groupTab',
    handle: '.drag-handle-tab',
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

  addTab(idx: number) {
    this.toolsService.lockScrollTop();
    const clone: Tab[] = this.toolsService.copyObject(this.template.tabs);
    clone.splice(idx, 0, {
      hideContent: false,
      tabName: '',
      videos: []
    });
    this.template.tabs = clone;
  }

  deleteTab(idx: number) {
    this.template.tabs.splice(idx, 1);
  }

  addVideo(tabIdx: number, videoIdx: number) {
    this.toolsService.lockScrollTop();
    const clone: Video[] = this.toolsService.copyObject(this.template.tabs[tabIdx].videos);
    clone.splice(videoIdx, 0, {
      hideContent: false,
      title: '',
      videoUrl: '',
      url: '',
      urlEnabled: true
    });
    this.template.tabs[tabIdx].videos = clone;
  }

  deleteVideo(tabIdx: number, videoIdx: number) {
    this.template.tabs[tabIdx].videos.splice(videoIdx, 1);
  }

}
