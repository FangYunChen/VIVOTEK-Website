import { Component, Input, OnInit } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-templates-type11',
  templateUrl: './templates-type11.component.html',
  styleUrls: ['./templates-type11.component.scss']
})
export class TemplatesType11Component implements OnInit {

  @Input() readOnly;
  @Input() path;
  @Input() templateIndex;
  @Input() template: Template;

  constructor() { }

  ngOnInit() { }

}
