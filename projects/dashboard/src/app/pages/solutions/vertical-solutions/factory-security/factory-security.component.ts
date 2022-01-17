import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-vertical-security',
  templateUrl: './factory-security.component.html'
})
export class FactorySecurityComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Vertical Solutions - Factory Security Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/Vertical/Factory-Security',
    apis: {
      get: 'api/Solutions/FactorySecurity',
      patch: 'api/Solutions/FactorySecurity'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
