import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-img-text',
  templateUrl: './model-img-text.component.html',
  styleUrls: ['./model-img-text.component.scss']
})
export class ModelImgTextComponent implements OnInit {
  @Input() content = '';
  constructor() {}

  ngOnInit() {}
}
