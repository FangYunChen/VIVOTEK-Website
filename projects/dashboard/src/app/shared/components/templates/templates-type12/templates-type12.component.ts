import { Component, Input, OnInit } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { SortablejsOptions } from 'angular-sortablejs';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'vvtk-templates-type12',
  templateUrl: './templates-type12.component.html',
  styleUrls: ['./templates-type12.component.scss']
})
export class TemplatesType12Component implements OnInit {

  @Input() readOnly;
  @Input() templateIndex;
  @Input() template: Template;
  public selected = 3;

  groupOptionsListItem: SortablejsOptions = {
    group: 'groupListItem',
    handle: '.drag-handle-list-item',
    animation: 300
  };
  groupOptionsListItemText: SortablejsOptions = {
    group: 'groupListItemText',
    handle: '.drag-handle-list-item-text',
    animation: 300
  };

  columnsControl = new FormControl('', [Validators.required]);
  columns: Columns[] = [
    { name: '1 Column', key: 1 },
    { name: '2 Columns', key: 2 },
    { name: '3 Columns', key: 3 },
    { name: '4 Columns', key: 4 },
    { name: '5 Columns', key: 5 },
    { name: '6 Columns', key: 6 },
  ];

  constructor(
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    if (this.template.rowColumn === 0) {
      this.template.rowColumn = this.selected;
    } else {
      this.selected = this.template.rowColumn;
    }
  }

  addListItem(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.listItems);
    clone.splice(idx, 0, {
      hideContent: false,
      title: '',
      itemTexts: [{ text: '' }]
    });
    this.template.listItems = clone;
  }

  deleteListItem(idx: number) {
    this.template.listItems.splice(idx, 1);
  }

  addItemText(listItemIdx: number, itemIdx: number) {
    const itemTexts = this.template.listItems[listItemIdx].itemTexts;
    if (itemTexts.length >= 10) {
      return;
    }
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(itemTexts);
    clone.splice(itemIdx, 0, { text: '' });
    this.template.listItems[listItemIdx].itemTexts = clone;
  }

  deleteItemText(listItemIdx: number, itemIdx: number) {
    this.template.listItems[listItemIdx].itemTexts.splice(itemIdx, 1);
  }

  selectChange(val: number) {
    this.template.rowColumn = val;
  }
}

export interface Columns {
  name: string;
  key: number;
}
