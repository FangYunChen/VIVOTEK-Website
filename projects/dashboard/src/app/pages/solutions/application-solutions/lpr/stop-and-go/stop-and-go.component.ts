import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-stop-and-go',
  templateUrl: './stop-and-go.component.html'
})
export class StopAndGoComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - Stop And Go Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/StopAndGo',
    apis: {
      get: 'api/Solutions/StopAndGo',
      patch: 'api/Solutions/StopAndGo'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
