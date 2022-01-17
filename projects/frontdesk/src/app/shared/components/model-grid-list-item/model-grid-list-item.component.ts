import { Component, OnInit, Input } from '@angular/core';

import { GridListItem } from '@frontdesk/core/interfaces/grid-list-item';

@Component({
  selector: 'vvtk-model-grid-list-item',
  templateUrl: './model-grid-list-item.component.html',
  styleUrls: ['./model-grid-list-item.component.scss']
})
export class ModelGridListItemComponent implements OnInit {

  @Input()
  data: GridListItem[];

  constructor() { }

  ngOnInit() {
  }

}
