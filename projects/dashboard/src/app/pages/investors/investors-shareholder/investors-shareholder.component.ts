import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-shareholder',
  templateUrl: './investors-shareholder.component.html'
})
export class InvestorsShareholderComponent implements OnInit {
  opts = {
    title: '主要股東名單',
    routerPath: '/investors/shareholder',
    apis: {
      get: 'api/shareholder/Status'
    }
  };
  constructor() {}

  ngOnInit() {}
}
