import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-shareholder-shareholding',
  templateUrl: './investors-shareholder-shareholding.component.html'
})
export class InvestorsShareholderShareholdingComponent implements OnInit {
  opts = {
    title: '股務資訊',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Investors/Shareholder/Shareholding',
    apis: {
      get: 'api/Investors/Shareholder/Shareholding',
      patch: 'api/Investors/Shareholder/Shareholding'
    }
  };

  constructor() {}

  ngOnInit() {}
}
