import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-sia',
  templateUrl: './sia.component.html'
})
export class SIAComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'SIA Program - SIA',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Partners/SIAProgram/SIA',
    apis: {
      get: 'api/Partners/SIA',
      patch: 'api/Partners/SIA'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
