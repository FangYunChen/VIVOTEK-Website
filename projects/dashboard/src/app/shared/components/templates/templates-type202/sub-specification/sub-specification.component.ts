import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Specification } from '../../../../../vvtk-core/classes/template';
import { SortablejsOptions } from 'angular-sortablejs';
import { ToolsService } from '../../../../../vvtk-core/services/tools.service';

@Component({
  selector: 'vvtk-sub-specification',
  templateUrl: './sub-specification.component.html',
  styleUrls: ['./sub-specification.component.scss']
})
export class SubSpecificationComponent implements OnInit {

  @Input()
  specDetails: Specification[];

  @Input()
  layer = 1;

  @Input()
  readOnly = true;

  @Input()
  templateIndex;

  @Output()
  addSpec: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  deleteSpec: EventEmitter<number> = new EventEmitter<number>();

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  constructor(private toolsService: ToolsService) { }

  ngOnInit() {
  }

  changeType(detailIdx: number, isAttributeChangeValue: boolean) {
    if (isAttributeChangeValue) {
      this.specDetails[detailIdx].children = [];
    }
  }

  addChildSpec(detailIdx: number, childIdx: number) {
    this.toolsService.lockScrollTop();
    const clone: Specification[] = this.toolsService.copyObject(this.specDetails[detailIdx].children);
    clone.splice(childIdx, 0, {
      hideContent: false,
      name: '',
      isAttribute: false,
      content: '',
      children: [],
    });
    this.specDetails[detailIdx].children = clone;
  }

  deleteChildSped(detailIdx: number, childIdx: number) {
    this.specDetails[detailIdx].children.splice(childIdx, 1);
  }

}
