import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-security',
  templateUrl: './security.component.html'
})
export class SecurityComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Vertical Solutions - Security Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/VerticalSolutions/Security',
    apis: {
      get: 'api/Solutions/Security',
      patch: 'api/Solutions/Security'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
