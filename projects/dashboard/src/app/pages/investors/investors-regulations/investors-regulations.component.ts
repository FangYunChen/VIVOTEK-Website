import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-regulations',
  templateUrl: './investors-regulations.component.html'
})
export class InvestorsRegulationsComponent implements OnInit {
  opts = {
    title: '重要公司內規',
    hasContent: true,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Investors/Regulations',
    apis: {
      get: 'api/Regulations',
      patch: 'api/Regulations'
    },
    templateTypes: [2]
  };

  constructor() {}

  ngOnInit() {}
}
