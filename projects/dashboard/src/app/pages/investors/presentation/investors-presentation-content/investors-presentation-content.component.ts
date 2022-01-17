import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-presentation-content',
  templateUrl: './investors-presentation-content.component.html'
})
export class InvestorsPresentationContentComponent implements OnInit {
  opts = {
    title: '法說會Info',
    hasContent: true,
    hasTemplate: false,
    hasSheet: false,
    dirPath: 'Investors/Presentation/Content',
    apis: {
      get: 'api/Investors/Presentation/Content',
      patch: 'api/Investors/Presentation/Content'
    }
  };

  constructor() {}

  ngOnInit() {}
}
