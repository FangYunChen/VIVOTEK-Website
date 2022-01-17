import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-see-more',
  templateUrl: './see-more.component.html'
})
export class SeeMoreComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - See More in Smarter Ways',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/SeeMore',
    apis: {
      get: 'api/Solutions/SeeMore',
      patch: 'api/Solutions/SeeMore'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
