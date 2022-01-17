import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'vvtk-three-banner',
  templateUrl: './three-banner.component.html',
  styleUrls: ['./three-banner.component.scss']
})
export class ThreeBannerComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  @Input() bannerItem;
  @Input() preString = '';
  @Input() target: string;

  constructor(@Inject(PLATFORM_ID) private platform_id) {}

  ngOnInit() {
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

  getBlankUrl(url: string, routerLink: string[]) {
    if (this.isBrowser) {
      if (!url || url.length === 0 || url === 'null') {
        return routerLink.join('/');
      } else {
        return url;
      }
    }
  }
}
