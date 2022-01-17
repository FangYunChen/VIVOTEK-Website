import { Component, Input, OnInit } from '@angular/core';
import { Template, Specification } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';

@Component({
  selector: 'vvtk-templates-type202',
  templateUrl: './templates-type202.component.html',
  styleUrls: ['./templates-type202.component.scss']
})
export class TemplatesType202Component implements OnInit {

  @Input()
  readOnly;

  @Input()
  templateIndex;

  @Input()
  template: Template;

  constructor(
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
  }

  addSpec(idx: number) {
    this.toolsService.lockScrollTop();
    const clone: Specification[] = this.toolsService.copyObject(this.template.nestedSpecs);
    clone.splice(idx, 0, {
      hideContent: false,
      name: '',
      isAttribute: false,
      content: '',
      children: [],
    });
    this.template.nestedSpecs = clone;
  }

  deleteSpec(idx: number) {
    this.template.nestedSpecs.splice(idx, 1);
  }

}
