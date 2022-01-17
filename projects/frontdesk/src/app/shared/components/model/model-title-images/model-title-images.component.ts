import { Component, Input, OnInit } from '@angular/core';
import { Template } from '../../../../../../../dashboard/src/app/vvtk-core/classes/template';

@Component({
  selector: 'vvtk-model-title-images',
  templateUrl: './model-title-images.component.html',
  styleUrls: ['./model-title-images.component.scss']
})
export class ModelTitleImagesComponent implements OnInit {

  @Input()
  template: Template;
  ListContentRowFlexBasisStyle = '14%';

  constructor() { }

  ngOnInit() {
    if (this.template.rowColumn) {
      this.ListContentRowFlexBasisStyle = `${String(Math.floor(100 / this.template.rowColumn) - 2)}%`;
    }
  }

}
