import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-model-banner',
  templateUrl: './model-banner.component.html',
  styleUrls: ['./model-banner.component.scss']
})
export class ModelBannerComponent implements OnInit {
  @Input() content;
  constructor() { }

  ngOnInit() {
  }

  get browserWidth() {
    return document.body.clientWidth;
  }

  get bannerImageSrc() {
    const width = this.browserWidth;
    if (width > 1024) {
      return this.content.bannerImage.imagePC.src;
    } else if (width <= 1024 && width > 640) {
      return this.content.bannerImage.imageTablet.src;
    } else {
      return this.content.bannerImage.imageMobile.src;
    }
  }

}
