import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';

@Component({
  selector: 'vvtk-templates-type21',
  templateUrl: './templates-type21.component.html',
  styleUrls: ['./templates-type21.component.scss']
})
export class TemplatesType21Component implements OnInit {

  @Input()
  readOnly;

  @Input()
  path;

  @Input()
  templateIndex;

  @Input()
  template: Template;

  groupOptionsIcon: SortablejsOptions = {
    group: 'groupIcon',
    handle: '.drag-handle-icon',
    animation: 300
  };

  columns: CommonSelectOption[] = [
    { value: 1, optionText: '1 Column' },
    { value: 2, optionText: '2 Columns' },
    { value: 3, optionText: '3 Columns' },
    { value: 4, optionText: '4 Columns' },
    { value: 5, optionText: '5 Columns' },
    { value: 6, optionText: '6 Columns' }
  ];

  constructor(
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    // default value
    if (!this.template.rowColumn) {
      this.template.rowColumn = 2;
    }
  }

  addColumn(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.columns);
    clone.splice(idx, 0, {
      hideContent: false,
      title: '',
      htmlContent: ''
    });
    this.template.columns = clone;
  }

  deleteColumn(idx: number) {
    this.template.columns.splice(idx, 1);
  }

}
