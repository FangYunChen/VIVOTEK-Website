import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-buy-how',
  templateUrl: './buy-how.component.html'
})
export class BuyHowComponent implements OnInit {
  opts = {
    title: 'How to Buy',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Buy/How',
    apis: {
      get: 'api/Buy/How',
      patch: 'api/Buy/How'
    }
  };

  constructor() {}

  ngOnInit() {}
}
