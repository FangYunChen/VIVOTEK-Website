import { Component, OnInit } from '@angular/core';
import { RuleOpts } from '../../../vvtk-core/classes/rule';

@Component({
  selector: 'vvtk-rule-trademarks',
  templateUrl: './rule-trademarks.component.html',
  styleUrls: ['./rule-trademarks.component.scss']
})
export class RuleTrademarksComponent implements OnInit {
  opts: RuleOpts = {
    title: 'Trademarks',
    get: 'api/Trademarks',
    patch: 'api/Trademarks',
    dirPath: 'Rule/Trademarks'
  };
  constructor() {}

  ngOnInit() {}
}
