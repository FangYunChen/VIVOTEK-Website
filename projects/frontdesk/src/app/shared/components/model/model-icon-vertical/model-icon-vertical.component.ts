import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-icon-vertical',
  templateUrl: './model-icon-vertical.component.html',
  styleUrls: ['./model-icon-vertical.component.scss']
})
export class ModelIconVerticalComponent implements OnInit {
  @Input() template;
  constructor() { }

  ngOnInit() { }
}
