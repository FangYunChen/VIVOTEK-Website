import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-guideline',
  templateUrl: './guideline.component.html'
})
export class GuidelineComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Partners - Guideline',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Partners/Guideline',
    apis: {
      get: 'api/Partners/Guideline',
      patch: 'api/Partners/Guideline'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
