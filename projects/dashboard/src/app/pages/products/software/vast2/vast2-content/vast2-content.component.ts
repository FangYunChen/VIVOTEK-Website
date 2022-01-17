import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DynamicTemplatePageOption } from '../../../../../vvtk-core/classes/dynamicTemplate';
import { TabTemplates } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-vast2-content',
  templateUrl: './vast2-content.component.html',
  styleUrls: ['./vast2-content.component.scss']
})

export class Vast2ContentComponent implements OnInit {
  opts: DynamicTemplatePageOption = {
    id: 0,
    title: 'Products - VAST2',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Products/VAST2',
    apis: {
      get: 'api/Products/VAST2',
      post: 'api/Products/VAST2',
      patch: 'api/Products/VAST2'
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
