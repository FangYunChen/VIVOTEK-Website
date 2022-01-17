import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-manage',
  templateUrl: './investors-manage.component.html'
})
export class InvestorsManageComponent implements OnInit {
  opts = {
    title: '公司治理',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Investors/Manage',
    apis: {
      get: 'api/Manage',
      patch: 'api/Manage'
    }
  };

  constructor() {}

  ngOnInit() {}
}
