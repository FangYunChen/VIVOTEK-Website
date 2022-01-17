import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Parking Violation Detection Support List - Page',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Learning/ParkingViolationDetection/SupportPage',
    apis: {
      get: 'api/Products/ParkingViolationDetection/SupportPage',
      patch: 'api/Products/ParkingViolationDetection/SupportPage'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
