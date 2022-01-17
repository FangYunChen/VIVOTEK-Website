import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-operation',
  templateUrl: './investors-operation.component.html'
})
export class InvestorsOperationComponent implements OnInit {
  opts = {
    title: '內部稽核組織及運作',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Investors/Operation',
    apis: {
      get: 'api/Operation',
      patch: 'api/Operation'
    }
  };

  constructor() {}

  ngOnInit() {}
}
