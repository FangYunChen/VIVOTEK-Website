import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DynamicTemplatePageOption } from '../../../../../vvtk-core/classes/dynamicTemplate';
import { TabTemplates } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-restricted-zone-detection',
  templateUrl: './restricted-zone-detection-content.component.html',
  styleUrls: ['./restricted-zone-detection-content.component.scss']
})

export class RestrictedZoneDetectionContentComponent implements OnInit {
  opts: DynamicTemplatePageOption = {
    id: 0,
    title: 'Restricted Zone Detection',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'RestrictedZoneDetection',
    apis: {
      get: 'api/RestrictedZoneDetection',
      post: 'api/RestrictedZoneDetection',
      patch: 'api/RestrictedZoneDetection'
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
