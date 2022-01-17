import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-multi-sensor',
  templateUrl: './multi-sensor.component.html'
})
export class MultiSensorComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - Multi-Sensor Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/MultiSensor',
    apis: {
      get: 'api/Solutions/MultiSensor',
      patch: 'api/Solutions/MultiSensor'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
