import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-vadp-intro',
  templateUrl: './vadp-intro.component.html'
})
export class VADPIntroComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'SIA Program - VADP - VADP Intro',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Partners/SIAProgram/VADP/VADPIntro',
    apis: {
      get: 'api/Partners/SIAProgram/VADP/VADPIntro',
      patch: 'api/Partners/SIAProgram/VADP/VADPIntro'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
