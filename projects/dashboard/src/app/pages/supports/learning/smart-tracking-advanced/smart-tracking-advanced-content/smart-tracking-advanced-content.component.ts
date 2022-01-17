import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DynamicTemplatePageOption } from '../../../../../vvtk-core/classes/dynamicTemplate';
import { TabTemplates } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-smart-tracking-advanced',
  templateUrl: './smart-tracking-advanced-content.component.html',
  styleUrls: ['./smart-tracking-advanced-content.component.scss']
})

export class SmartTrackingAdvancedContentComponent implements OnInit {
  opts: DynamicTemplatePageOption = {
    id: 0,
    title: 'Smart Tracking Advanced',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'SmartTrackingAdvanced',
    apis: {
      get: 'api/SmartTrackingAdvanced',
      post: 'api/SmartTrackingAdvanced',
      patch: 'api/SmartTrackingAdvanced'
    }
  };

  data: TabTemplates;

  constructor(
    private route: ActivatedRoute
  ) {
    this.data = {
      id: 0,
      tabName: '',
      anchorUrl: '',
      templates: [],
      content: '',
      sheet: null
    };
    this.route.params.pipe(first()).subscribe(param => {
      this.opts.id = +param.id;
    }).unsubscribe();
  }

  ngOnInit() { }

}
