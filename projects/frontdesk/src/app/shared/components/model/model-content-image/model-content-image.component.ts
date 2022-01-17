import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-model-content-image',
  templateUrl: './model-content-image.component.html',
  styleUrls: ['./model-content-image.component.scss']
})
export class ModelContentImageComponent implements OnInit {

  @Input() template;

  constructor() { }

  ngOnInit() {
  }

}
