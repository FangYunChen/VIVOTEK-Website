import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-Aec',
  templateUrl: './aec.component.html'
})
export class AecComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Partners - Aec',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Partners/Aec',
    apis: {
      get: 'api/Partners/Aec',
      patch: 'api/Partners/Aec'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
