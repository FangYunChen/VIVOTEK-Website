import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-careers-working',
  templateUrl: './careers-working.component.html'
})
export class CareersWorkingComponent implements OnInit {
  opts = {
    title: 'Working at VIVOTEK',
    hasContent: true,
    hasTemplate: false,
    hasSheet: false,
    dirPath: 'Careers/Working',
    apis: {
      get: 'api/Careers/Working',
      patch: 'api/Careers/Working'
    }
  };

  constructor() {}

  ngOnInit() {}
}
