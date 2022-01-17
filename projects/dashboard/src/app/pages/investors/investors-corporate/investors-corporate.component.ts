import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-corporate',
  templateUrl: './investors-corporate.component.html'
})
export class InvestorsCorporateComponent implements OnInit {
  opts = {
    title: '企業社會責任',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Investors/Corporate',
    apis: {
      get: 'api/Corporate',
      patch: 'api/Corporate'
    }
  };

  constructor() {}

  ngOnInit() {}
}
