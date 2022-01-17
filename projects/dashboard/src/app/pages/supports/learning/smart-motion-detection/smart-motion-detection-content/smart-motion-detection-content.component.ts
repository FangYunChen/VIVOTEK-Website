import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DynamicTemplatePageOption } from '../../../../../vvtk-core/classes/dynamicTemplate';
import { TabTemplates } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-smart-motion-detection',
  templateUrl: './smart-motion-detection-content.component.html',
  styleUrls: ['./smart-motion-detection-content.component.scss']
})

export class SmartMotionDetectionContentComponent implements OnInit {
  opts: DynamicTemplatePageOption = {
    id: 0,
    title: 'Smart Motion Detection',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'SmartMotionDetection',
    apis: {
      get: 'api/SmartMotionDetection',
      post: 'api/SmartMotionDetection',
      patch: 'api/SmartMotionDetection'
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
