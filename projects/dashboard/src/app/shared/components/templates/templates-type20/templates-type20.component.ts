import { Component, Input, OnInit } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'vvtk-templates-type20',
  templateUrl: './templates-type20.component.html',
  styleUrls: ['./templates-type20.component.scss']
})
export class TemplatesType20Component implements OnInit {

  @Input() readOnly;
  @Input() templateIndex;
  @Input() template: Template;

  groupOptionsIcon: SortablejsOptions = {
    group: 'groupIcon',
    handle: '.drag-handle-icon',
    animation: 300
  };

  constructor(
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  addItem(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(
      this.template.listLinkItem.linkItems
    );
    clone.splice(idx, 0, {
      hideContent: false,
      text: '',
      url: ''
    });
    this.template.listLinkItem.linkItems = clone;
  }

  deleteItem(idx: number) {
    this.template.listLinkItem.linkItems.splice(idx, 1);
  }
}
