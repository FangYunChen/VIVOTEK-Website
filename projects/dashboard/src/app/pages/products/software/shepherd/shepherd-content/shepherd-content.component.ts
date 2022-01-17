import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DynamicTemplatePageOption } from '../../../../../vvtk-core/classes/dynamicTemplate';
import { TabTemplates } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-shepherd-content',
  templateUrl: './shepherd-content.component.html',
  styleUrls: ['./shepherd-content.component.scss']
})

export class ShepherdContentComponent implements OnInit {
  opts: DynamicTemplatePageOption = {
    id: 0,
    title: 'Products - Shepherd',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'ProductsShepherd',
    apis: {
      get: 'api/ProductsShepherd',
      post: 'api/ProductsShepherd',
      patch: 'api/ProductsShepherd'
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
