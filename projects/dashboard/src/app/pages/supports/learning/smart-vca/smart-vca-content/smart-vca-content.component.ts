import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DynamicTemplatePageOption } from '../../../../../vvtk-core/classes/dynamicTemplate';
import { TabTemplates } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-smart-vca',
  templateUrl: './smart-vca-content.component.html',
  styleUrls: ['./smart-vca-content.component.scss']
})

export class SmartVcaContentComponent implements OnInit {
  opts: DynamicTemplatePageOption = {
    id: 0,
    title: 'Smart Vca Solutions',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'SmartVca',
    apis: {
      get: 'api/SmartVca',
      post: 'api/SmartVca',
      patch: 'api/SmartVca'
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
