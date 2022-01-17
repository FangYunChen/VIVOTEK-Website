import { Component, OnInit } from '@angular/core';
import { RuleOpts } from '../../../vvtk-core/classes/rule';

@Component({
  selector: 'vvtk-rule-terms',
  templateUrl: './rule-terms.component.html',
  styleUrls: ['./rule-terms.component.scss']
})
export class RuleTermsComponent implements OnInit {
  opts: RuleOpts = {
    title: 'Terms Of Use',
    get: 'api/TermsOfUse',
    patch: 'api/TermsOfUse',
    dirPath: 'Rule/TermsOfUse'
  };
  constructor() {}

  ngOnInit() {}
}
