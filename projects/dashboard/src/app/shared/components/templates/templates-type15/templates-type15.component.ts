import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'vvtk-templates-type15',
  templateUrl: './templates-type15.component.html',
  styleUrls: ['./templates-type15.component.scss']
})
export class TemplatesType15Component implements OnInit {

  @Input() readOnly;
  @Input() templateIndex;
  @Input() template: Template;

  groupOptionsVideo: SortablejsOptions = {
    group: 'groupVideo',
    handle: '.drag-handle-video',
    animation: 300
  };

  constructor(
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  addVideo(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.videos);
    clone.splice(idx, 0, {
      hideContent: false,
      title: '',
      url: '',
      urlEnabled: true,
      videoUrl: ''
    });
    this.template.videos = clone;
  }

  deleteVideo(idx: number) {
    this.template.videos.splice(idx, 1);
  }

}
