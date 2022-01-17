import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Smart Motion Detection Support List - Page',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Learning/SmartMotionDetection/SupportPage',
    apis: {
      get: 'api/Products/SmartMotionDetection/SupportPage',
      patch: 'api/Products/SmartMotionDetection/SupportPage'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
