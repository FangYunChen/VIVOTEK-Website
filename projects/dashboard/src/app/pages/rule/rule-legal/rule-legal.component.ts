import { Component, OnInit } from '@angular/core';
import { RuleOpts } from '../../../vvtk-core/classes/rule';

@Component({
  selector: 'vvtk-rule-legal',
  templateUrl: './rule-legal.component.html',
  styleUrls: ['./rule-legal.component.scss']
})
export class RuleLegalComponent implements OnInit {
  opts: RuleOpts = {
    title: 'Legal',
    get: 'api/Legal',
    patch: 'api/Legal',
    dirPath: 'Rule/Legal'
  };
  constructor() {}

  ngOnInit() {}
}
