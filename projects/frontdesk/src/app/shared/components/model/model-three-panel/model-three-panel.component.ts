import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-three-panel',
  templateUrl: './model-three-panel.component.html',
  styleUrls: ['./model-three-panel.component.scss']
})
export class ModelThreePanelComponent implements OnInit {

  @Input()
  title;

  @Input()
  panels;

  constructor() { }

  ngOnInit() { }
}
