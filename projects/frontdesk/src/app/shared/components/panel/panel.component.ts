import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'vvtk-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  @Input()
  panel;

  openPopup = false;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (this.panel.video) {
      const youtubeImg = `//img.youtube.com/vi/${
        this.panel.video
      }/maxresdefault.jpg`;
      if (this.panel.image) {
        this.panel.image.src = youtubeImg;
      }
      if (this.panel.img) {
        this.panel.img.src = youtubeImg;
      }
    }
    if (this.isBrowser) {
      setTimeout(() => {
        $('.limit').each(function() {
          const _height = $(this)
            .find('p')
            .height();
          const _limitHeight = $(this).height();
          if (_height > _limitHeight) {
            $(this).addClass('limitAfter');
          }
        });
      }, 1);
    }
  }

  windowPopup($event) {
    this.openPopup = $event;
  }
}
