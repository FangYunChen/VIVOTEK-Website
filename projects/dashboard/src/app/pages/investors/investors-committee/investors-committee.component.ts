import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-committee',
  templateUrl: './investors-committee.component.html'
})
export class InvestorsCommitteeComponent implements OnInit {
  opts = {
    title: '薪酬委員會',
    routerPath: '/investors/committee',
    apis: {
      get: 'api/Committee/Status'
    }
  };
  constructor() {}

  ngOnInit() {}
}
