import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-hardware',
  templateUrl: './hardware.component.html'
})
export class HardwareComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'SIA Program - Hardware',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Partners/SIAProgram/Hardware',
    apis: {
      get: 'api/Partners/Hardware',
      patch: 'api/Partners/Hardware'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
