import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-core-plus',
  templateUrl: './core-plus.component.html'
})
export class CorePlusComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - CorePlus',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/application-solutions/CorePlus',
    apis: {
      get: 'api/Solutions/CorePlus',
      patch: 'api/Solutions/CorePlus'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
