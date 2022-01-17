import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-learning-and-development',
  templateUrl: './learning-and-development.component.html',
  styleUrls: ['./learning-and-development.component.scss']
})
export class LearningAndDevelopmentComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'Learning And Development',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/Careers/LearningAndDevelopment',
    apis: {
      get: 'api/Careers/LearningAndDevelopment',
      patch: 'api/Careers/LearningAndDevelopment'
    }
  };

  constructor() {}

  ngOnInit() {}
}
