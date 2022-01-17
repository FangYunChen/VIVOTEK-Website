import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  opts: TemplatePageOption = {
    // route from app to surveillance(have chance to change)
    title: 'Products - VIVOCloud - Surveillance',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Products/VIVOCloud/App',
    apis: {
      get: 'api/Products/VIVOCloud/App',
      patch: 'api/Products/VIVOCloud/App'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
