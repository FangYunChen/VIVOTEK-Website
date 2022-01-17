import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
declare var $: any;

@Component({
  selector: 'vvtk-mutiple-banner-two-block',
  templateUrl: './mutiple-banner-two-block.component.html',
  styleUrls: ['./mutiple-banner-two-block.component.scss']
})
export class MutipleBannerTwoBlockComponent implements OnInit {
  @Input() modelStyle;
  @Input() bannerItem;

  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  rwdDevice = '';
  windowWidth: number;

  constructor(
    @Inject(PLATFORM_ID) private platform_id
  ) { }

  ngOnInit() {
    if (this.isBrowser) {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 1024) {
        this.rwdDevice = 'web';
      } else if (this.windowWidth > 480) {
        this.rwdDevice = 'table';
      } else {
        this.rwdDevice = 'mobile';
      }
    }
    this.setHomeSlider();
  }

  setHomeSlider() {
    if (this.isBrowser) {
      setTimeout(() => {
        $('.full-slider').slick({
          autoplay: true,
          speed: 800,
          autoplaySpeed: 4800,
          dots: true,
          adaptiveHeight: true,
          prevArrow:
            '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
          nextArrow:
            '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>'
        });
        $('.full-slider .slider-item-img').each(function () {
          let $img = $(this)
            .find('img')
            .attr('src');
          $img = encodeURI($img);
          $(this).css('background-image', 'url(' + $img + ')');
        });
      }, 1);
    }
  }
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
    if (this.windowWidth > 1024) {
      this.rwdDevice = 'web';
    } else if (this.windowWidth > 480) {
      this.rwdDevice = 'table';
    } else {
      this.rwdDevice = 'mobile';
    }
  }
}
