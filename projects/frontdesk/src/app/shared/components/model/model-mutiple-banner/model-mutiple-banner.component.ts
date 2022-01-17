import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-model-mutiple-banner',
  templateUrl: './model-mutiple-banner.component.html',
  styleUrls: ['./model-mutiple-banner.component.scss']
})
export class ModelMutipleBannerComponent implements OnInit {
  @Input() content;
  constructor() { }

  ngOnInit() {
  }
}
