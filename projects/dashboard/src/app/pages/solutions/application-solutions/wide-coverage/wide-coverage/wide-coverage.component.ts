import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-wide-coverage',
  templateUrl: './wide-coverage.component.html'
})
export class WideCoverageComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - Wide Coverage Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/WideCoverage',
    apis: {
      get: 'api/Solutions/WideCoverage',
      patch: 'api/Solutions/WideCoverage'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
