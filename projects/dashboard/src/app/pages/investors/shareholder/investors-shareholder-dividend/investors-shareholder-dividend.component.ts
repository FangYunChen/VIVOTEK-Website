import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-shareholder-dividend',
  templateUrl: './investors-shareholder-dividend.component.html'
})
export class InvestorsShareholderDividendComponent implements OnInit {
  opts = {
    title: '歷年股利分配',
    hasContent: true,
    hasTemplate: false,
    hasSheet: true,
    dirPath: 'Investors/Shareholder/Dividend',
    apis: {
      get: 'api/Investors/Shareholder/Dividend',
      patch: 'api/Investors/Shareholder/Dividend'
    }
  };

  constructor() {}

  ngOnInit() {}
}
