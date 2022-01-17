import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-heatmap',
  templateUrl: './heatmap.component.html'
})
export class HeatmapComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - Heatmap',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/Heatmap',
    apis: {
      get: 'api/Solutions/Heatmap',
      patch: 'api/Solutions/Heatmap'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
