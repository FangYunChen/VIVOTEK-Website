import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-two-block-vertical',
  templateUrl: './model-two-block-vertical.component.html',
  styleUrls: ['./model-two-block-vertical.component.scss']
})
export class ModelTwoBlockVerticalComponent implements OnInit {
  @Input()
  modelStyle;
  @Input()
  content;
  @Input()
  bgColor;
  constructor() {}

  ngOnInit() {
    if (this.content && this.content.video) {
      if (this.content.video.split('v=').length > 1) {
        this.content.video = this.content.video.split('v=')[1].split('&')[0];
      }
      if (this.content.video.split('/v/').length > 1) {
        this.content.video = this.content.video.split('/v/')[1].split('&')[0];
      }
    }
  }
}
