import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-180-solutions',
  templateUrl: './solutions-180.component.html'
})
export class Solutions180Component implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - 180 Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/180',
    apis: {
      get: 'api/Solutions/180',
      patch: 'api/Solutions/180'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
