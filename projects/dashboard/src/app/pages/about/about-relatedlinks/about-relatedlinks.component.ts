import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-relatedlinks',
  templateUrl: './about-relatedlinks.component.html'
})
export class AboutRelatedLinksComponent implements OnInit {
  opts = {
    title: 'About Us - Related Links',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'about/who-we-are/related-links',
    apis: {
      get: 'api/RelatedLinks',
      patch: 'api/RelatedLinks'
    }
  };

  constructor() { }

  ngOnInit() { }
}
