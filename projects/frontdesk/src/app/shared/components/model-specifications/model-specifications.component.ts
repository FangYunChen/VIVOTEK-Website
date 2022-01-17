import { Component, OnInit, Input } from '@angular/core';

import { ModelNestedSpecificationData } from '../model-nested-specification/model-nested-specification.component';

export interface ModelSpecificationsData {
  title?: string;
  nestedSpecs: ModelNestedSpecificationData[];
}

@Component({
  selector: 'vvtk-model-specifications',
  templateUrl: './model-specifications.component.html',
  styleUrls: ['./model-specifications.component.scss']
})
export class ModelSpecificationsComponent implements OnInit {

  @Input() data: ModelSpecificationsData;
  @Input() isExpand = false;

  constructor() { }

  ngOnInit() {
  }

  toggleExpand(element: Element) {
    this.isExpand = !this.isExpand;
    element.scrollIntoView();
  }

}
