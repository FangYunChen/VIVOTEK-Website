import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-online-training',
  templateUrl: './online-training.component.html'
})
export class OnlineTrainingComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Learning - VWA - Online Training',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/Learning/VWA/OnlineTraining',
    apis: {
      get: 'api/Supports/Learning/VWA/OnlineTraining',
      patch: 'api/Supports/Learning/VWA/OnlineTraining'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
