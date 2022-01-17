import { Component, OnInit } from '@angular/core';
import { RuleOpts } from '../../../vvtk-core/classes/rule';

@Component({
  selector: 'vvtk-rule-intellectual',
  templateUrl: './rule-intellectual.component.html',
  styleUrls: ['./rule-intellectual.component.scss']
})
export class RuleIntellectualComponent implements OnInit {
  opts: RuleOpts = {
    title: 'Intellectual Property',
    get: 'api/IntellectualProperty',
    patch: 'api/IntellectualProperty',
    dirPath: 'Rule/IntellectualProperty'
  };
  constructor() {}

  ngOnInit() {}
}
