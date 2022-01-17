import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-people-counting',
  templateUrl: './people-counting.component.html'
})
export class PeopleCountingComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - People Counting',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/PeopleCounting',
    apis: {
      get: 'api/Solutions/PeopleCounting',
      patch: 'api/Solutions/PeopleCounting'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
