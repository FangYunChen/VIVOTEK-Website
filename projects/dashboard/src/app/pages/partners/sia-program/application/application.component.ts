import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'SIA Program - Application',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Partners/SIAProgram/Application',
    apis: {
      get: 'api/Partners/Application',
      patch: 'api/Partners/Application'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
