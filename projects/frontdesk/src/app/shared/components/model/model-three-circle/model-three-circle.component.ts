import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-model-three-circle',
  templateUrl: './model-three-circle.component.html',
  styleUrls: ['./model-three-circle.component.scss']
})
export class ModelThreeCircleComponent implements OnInit {
  @Input() content;
  constructor() { }

  ngOnInit() {
  }

}
