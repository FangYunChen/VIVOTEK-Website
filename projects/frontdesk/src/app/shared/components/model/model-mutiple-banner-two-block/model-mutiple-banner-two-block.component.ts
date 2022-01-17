import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-model-mutiple-banner-two-block',
  templateUrl: './model-mutiple-banner-two-block.component.html',
  styleUrls: ['./model-mutiple-banner-two-block.component.scss']
})
export class ModelMutipleBannerTwoBlockComponent implements OnInit {
  @Input() template;
  constructor() { }

  ngOnInit() {
  }
}
