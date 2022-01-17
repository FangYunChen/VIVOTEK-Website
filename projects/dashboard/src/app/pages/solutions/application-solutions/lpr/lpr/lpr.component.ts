import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-lpr',
  templateUrl: './lpr.component.html'
})
export class LPRComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - LPR Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/LPR',
    apis: {
      get: 'api/Solutions/LPR',
      patch: 'api/Solutions/LPR'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
