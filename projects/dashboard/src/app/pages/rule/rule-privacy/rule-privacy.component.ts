import { Component, OnInit } from '@angular/core';
import { RuleOpts } from '../../../vvtk-core/classes/rule';

@Component({
  selector: 'vvtk-rule-privacy',
  templateUrl: './rule-privacy.component.html',
  styleUrls: ['./rule-privacy.component.scss']
})
export class RulePrivacyComponent implements OnInit {
  opts: RuleOpts = {
    title: 'Privacy Policy',
    get: 'api/PrivacyPolicy',
    patch: 'api/PrivacyPolicy',
    dirPath: 'Rule/PrivacyPolicy'
  };
  constructor() {}

  ngOnInit() {}
}
