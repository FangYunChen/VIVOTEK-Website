import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DynamicTemplatePageOption } from '../../../../../vvtk-core/classes/dynamicTemplate';
import { Transportation } from '../../../../../vvtk-core/classes/transportation';

@Component({
  selector: 'vvtk-transportation-content',
  templateUrl: './transportation-content.component.html',
  styleUrls: ['./transportation-content.component.scss']
})

export class TransportationContentComponent implements OnInit {
  opts: DynamicTemplatePageOption = {
    id: 0,
    title: 'Solutions - Transportation',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/Transportation',
    apis: {
      get: 'api/Solutions/Transportation',
      post: 'api/Solutions/Transportation',
      patch: 'api/Solutions/Transportation'
    }
  };

  data: Transportation;

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
