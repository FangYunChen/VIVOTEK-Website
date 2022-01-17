import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-employment-relationship',
  templateUrl: './employment-relationship.component.html',
  styleUrls: ['./employment-relationship.component.scss']
})
export class EmploymentRelationshipComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'Employment Relationship',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/Careers/EmploymentRelationship',
    apis: {
      get: 'api/Careers/EmploymentRelationship',
      patch: 'api/Careers/EmploymentRelationship'
    }
  };

  constructor() {}

  ngOnInit() {}
}
