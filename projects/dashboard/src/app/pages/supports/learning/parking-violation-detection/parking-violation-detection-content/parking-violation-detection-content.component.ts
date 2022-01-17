import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DynamicTemplatePageOption } from '../../../../../vvtk-core/classes/dynamicTemplate';
import { TabTemplates } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-parking-violation-detection',
  templateUrl: './parking-violation-detection-content.component.html',
  styleUrls: ['./parking-violation-detection-content.component.scss']
})

export class ParkingViolationDetectionContentComponent implements OnInit {
  opts: DynamicTemplatePageOption = {
    id: 0,
    title: 'Parking Violation Detection',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'ParkingViolationDetection',
    apis: {
      get: 'api/ParkingViolationDetection',
      post: 'api/ParkingViolationDetection',
      patch: 'api/ParkingViolationDetection'
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
