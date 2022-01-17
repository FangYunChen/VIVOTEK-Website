import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-architecture',
  templateUrl: './investors-architecture.component.html'
})
export class InvestorsArchitectureComponent implements OnInit {
  opts = {
    title: '公司架構',
    routerPath: '/investors/architecture',
    apis: {
      get: 'api/Architecture/Status'
    }
  };
  constructor() {}

  ngOnInit() {}
}
