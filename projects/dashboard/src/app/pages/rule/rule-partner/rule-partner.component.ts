import { Component, OnInit } from '@angular/core';
import { RuleOpts } from '../../../vvtk-core/classes/rule';

@Component({
  selector: 'vvtk-rule-partner',
  templateUrl: './rule-partner.component.html',
  styleUrls: ['./rule-partner.component.scss']
})
export class RulePartnerComponent implements OnInit {
  opts: RuleOpts = {
    title: 'Partner',
    get: 'api/Partner',
    patch: 'api/Partner',
    dirPath: 'Rule/Partner'
  };
  constructor() {}

  ngOnInit() {}
}
