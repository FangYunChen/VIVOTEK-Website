import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-online-training-step',
  templateUrl: './online-training-step.component.html',
  styleUrls: ['./online-training-step.component.scss']
})
export class OnlineTrainingStepComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'Online Training Step',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/LandingPages/OnlineTrainingStep',
    apis: {
      get: 'api/LandingPages/OnlineTrainingStep',
      patch: 'api/LandingPages/OnlineTrainingStep'
    }
  };

  constructor() {}

  ngOnInit() {}
}
