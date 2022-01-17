import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-compensation-and-benefit',
  templateUrl: './compensation-and-benefit.component.html',
  styleUrls: ['./compensation-and-benefit.component.scss']
})
export class CompensationAndBenefitComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'Compensation And Benefit',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/Careers/CompensationAndBenefit',
    apis: {
      get: 'api/Careers/CompensationAndBenefit',
      patch: 'api/Careers/CompensationAndBenefit'
    }
  };

  constructor() {}

  ngOnInit() {}
}
