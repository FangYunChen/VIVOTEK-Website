import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'vvtk-templates-type23',
  templateUrl: './templates-type23.component.html',
  styleUrls: ['./templates-type23.component.scss']
})
export class TemplatesType23Component implements OnInit {

  @Input() readOnly;
  @Input() templateIndex;
  @Input() template: Template;

  @Output()
  upload = new EventEmitter<boolean>();

  groupOptionsEventLocation: SortablejsOptions = {
    group: 'groupEventLocation',
    handle: '.drag-handle-eventLocation',
    animation: 300
  };

  constructor(
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  addEventLocation(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.eventLocations);
    clone.splice(idx, 0, {
      hideContent: false,
      eventDate: '',
      eventTime: '',
      title: '',
      subtitle: '',
      placeName: '',
      address: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      calendarUrl: '',
      url: '',
      urlEnabled: true
    });
    this.template.eventLocations = clone;
  }

  deleteEventLocation(idx: number) {
    this.template.eventLocations.splice(idx, 1);
  }

}
