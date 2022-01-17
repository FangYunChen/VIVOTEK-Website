import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-about-social',
  templateUrl: './about-social.component.html'
})
export class AboutSocialComponent implements OnInit {
  opts = {
    title: 'Corporate Social Responsibility - Overview',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'About/Social',
    apis: {
      get: 'api/Social',
      patch: 'api/Social'
    }
  };

  constructor() {}

  ngOnInit() {}
}
