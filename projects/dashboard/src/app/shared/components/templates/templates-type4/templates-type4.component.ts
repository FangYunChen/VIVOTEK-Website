import { Component, OnInit, Input } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-templates-type4',
  templateUrl: './templates-type4.component.html',
  styleUrls: ['./templates-type4.component.scss']
})
export class TemplatesType4Component implements OnInit {

  @Input() readOnly;
  @Input() templateIndex;
  @Input() template: Template;

  constructor() { }

  ngOnInit() { }

}
