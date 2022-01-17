import { Component, OnInit, Input } from '@angular/core';
import { Template } from '../../../../../../../dashboard/src/app/vvtk-core/classes/template';

@Component({
  selector: 'vvtk-model-list-link-item',
  templateUrl: './model-list-link-item.component.html',
  styleUrls: ['./model-list-link-item.component.scss']
})
export class ModelListLinkItemComponent implements OnInit {
  @Input()
  content: Template;
  constructor() {}

  ngOnInit() {}
}
