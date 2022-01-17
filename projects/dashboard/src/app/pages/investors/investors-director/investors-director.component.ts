import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-director',
  templateUrl: './investors-director.component.html'
})
export class InvestorsDirectorComponent implements OnInit {
  opts = {
    title: '董事會',
    routerPath: '/investors/director',
    apis: {
      get: 'api/Director/Status'
    }
  };
  constructor() {}

  ngOnInit() {}
}
