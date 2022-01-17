import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-ourbrand',
  templateUrl: './about-our-brand.component.html'
})
export class AboutOurBrandComponent implements OnInit {
  opts = {
    title: 'About Us - OurBrand',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'about/who-we-are/our-brand',
    apis: {
      get: 'api/WhoWeAre/OurBrand',
      patch: 'api/WhoWeAre/OurBrand'
    }
  };

  constructor() { }

  ngOnInit() { }
}
