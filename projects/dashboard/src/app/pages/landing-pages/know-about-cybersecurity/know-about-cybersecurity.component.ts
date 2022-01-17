import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-know-about-cybersecurity',
  templateUrl: './know-about-cybersecurity.component.html',
  styleUrls: ['./know-about-cybersecurity.component.scss']
})
export class KnowAboutCybersecurityComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'What You Should Know about Cybersecurity',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/LandingPages/KnowAboutCybersecurity',
    apis: {
      get: 'api/LandingPages/KnowAboutCybersecurity',
      patch: 'api/LandingPages/KnowAboutCybersecurity'
    }
  };

  constructor() {}

  ngOnInit() {}
}
