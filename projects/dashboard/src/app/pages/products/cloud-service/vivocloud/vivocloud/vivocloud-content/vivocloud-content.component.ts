import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DynamicTemplatePageOption } from '../../../../../../vvtk-core/classes/dynamicTemplate';
import { TabTemplates } from '../../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-crowd-control-content',
  templateUrl: './vivocloud-content.component.html',
  styleUrls: ['./vivocloud-content.component.scss']
})

export class VivocloudContentComponent implements OnInit {
  opts: DynamicTemplatePageOption = {
    id: 0,
    title: 'Vivocloud',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Product/Vivocloud',
    apis: {
      get: 'api/Product/VIVOCloud',
      post: 'api/Product/VIVOCloud',
      patch: 'api/Product/VIVOCloud'
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
