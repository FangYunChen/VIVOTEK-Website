import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-vwa',
  templateUrl: './vwa.component.html'
})
export class VWAComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Learning - VWA',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/Learning/VWA',
    apis: {
      get: 'api/Supports/Learning/VWA',
      patch: 'api/Supports/Learning/VWA'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
