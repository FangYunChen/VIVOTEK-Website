import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-model-two-block',
  templateUrl: './model-two-block.component.html',
  styleUrls: ['./model-two-block.component.scss']
})
export class ModelTwoBlockComponent implements OnInit {
  @Input() modelStyle;
  @Input() content;
  @Input() bgColor;
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
