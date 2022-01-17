import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-cybersecurity',
  templateUrl: './cybersecurity.component.html'
})
export class CybersecurityComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Support - Cybersecurity',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/Cybersecurity',
    apis: {
      get: 'api/Supports/Cybersecurity',
      patch: 'api/Supports/Cybersecurity'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
