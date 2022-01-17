import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-model-img-bg',
  templateUrl: './model-img-bg.component.html',
  styleUrls: ['./model-img-bg.component.scss']
})
export class ModelImgBgComponent implements OnInit {
  @Input() content;
  constructor() { }

  ngOnInit() {
  }

}
