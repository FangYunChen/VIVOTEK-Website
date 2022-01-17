import { Component, OnInit, Input } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';


@Component({
  selector: 'vvtk-templates-type1',
  templateUrl: './templates-type1.component.html',
  styleUrls: ['./templates-type1.component.scss']
})
export class TemplatesType1Component implements OnInit {

  @Input() readOnly;
  @Input() templateIndex;
  @Input() template: Template;

  constructor() { }

  ngOnInit() { }

}
