import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-productivity-and-safety',
  templateUrl: './productivity-and-safety.component.html'
})
export class ProductivivyAndSafetyComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Vertical Solutions - Productivivy And Safety Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/Vertical/Productivity-And-Safety',
    apis: {
      get: 'api/Solutions/ProductivityAndSafety',
      patch: 'api/Solutions/ProductivityAndSafety'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
