import { Component, OnInit, Input } from '@angular/core';

export interface ModelNestedSpecificationData {
  name: string;
  isAttribute?: boolean;
  isDisplay?: boolean;
  content?: string;
  children?: ModelNestedSpecificationData[];
}

@Component({
  selector: 'vvtk-model-nested-specification',
  templateUrl: './model-nested-specification.component.html',
  styleUrls: ['./model-nested-specification.component.scss']
})
export class ModelNestedSpecificationComponent implements OnInit {

  @Input() layer = 1;
  @Input() showEmpty = false;
  @Input() data: ModelNestedSpecificationData[];

  constructor() { }

  ngOnInit() {
  }

}
