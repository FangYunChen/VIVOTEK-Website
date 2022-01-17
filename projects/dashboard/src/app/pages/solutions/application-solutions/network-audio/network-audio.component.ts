import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-network-audio',
  templateUrl: './network-audio.component.html'
})
export class NetworkAudioComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - Network Audio Landing Page',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/application-solutions/NetworkAudio',
    apis: {
      get: 'api/Solutions/NetworkAudio',
      patch: 'api/Solutions/NetworkAudio'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
