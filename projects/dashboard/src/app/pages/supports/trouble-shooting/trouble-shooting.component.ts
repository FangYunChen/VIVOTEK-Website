import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-trouble-shooting',
  templateUrl: './trouble-shooting.component.html'
})
export class TroubleShootingComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Support - Trouble Shooting',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Support/TroubleShooting',
    apis: {
      get: 'api/Support/TroubleShooting',
      patch: 'api/Support/TroubleShooting'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
