import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-360-solutions',
  templateUrl: './solutions-360.component.html'
})
export class Solutions360Component implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - 360 Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/360',
    apis: {
      get: 'api/Solutions/360',
      patch: 'api/Solutions/360'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
