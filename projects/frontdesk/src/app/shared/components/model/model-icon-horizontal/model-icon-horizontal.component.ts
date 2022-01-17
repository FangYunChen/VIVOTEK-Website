import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-icon-horizontal',
  templateUrl: './model-icon-horizontal.component.html',
  styleUrls: ['./model-icon-horizontal.component.scss']
})
export class ModelIconHorizontalComponent implements OnInit {
  @Input() template;
  constructor() { }

  ngOnInit() { }
}
