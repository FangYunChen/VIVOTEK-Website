import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID
} from '@angular/core';

declare var $: any;

@Component({
  selector: 'vvtk-tab-slider',
  templateUrl: './tab-slider.component.html',
  styleUrls: ['./tab-slider.component.scss']
})
export class TabSliderComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  @Input() clickEvent = true;

  @Input() mouseoverEvent = false;

  tabsCount = 4;
  @Input() tabsActive;
  @Output() tabsOpen = new EventEmitter();

  isLoaging = false;
  nowLimit = 0;
  slideStart = 0;

  @Input() tabList: any;
  @Input() preString: any;

  constructor(@Inject(PLATFORM_ID) private platform_id) { }

  ngOnInit() {
    if (this.tabList.length < 4) {
      this.tabsCount = this.tabList.length;
    }
    for (let i = 0; i <= this.tabList.length; i++) {
      if (this.preString + this.tabList[i] === this.tabsActive) {
        this.slideStart = i;
      }
    }

    this.setHomeSlider();
  }
  mouseover(tabsActive) {
    if (!this.mouseoverEvent) {
      return;
    }
    this.tabsChange(tabsActive);
  }
  click(tabsActive) {
    if (!this.clickEvent) {
      return;
    }
    this.tabsChange(tabsActive);
  }
  tabsChange(tabsActive) {
    this.tabsActive = tabsActive;
    this.tabsOpen.emit(tabsActive);
  }
  setHomeSlider() {
    if (this.isBrowser) {
      require('slick-carousel');
      setTimeout(() => {
        const $slider = $('.tabs-slider .tabs-slider-nav');
        $slider.not('.slick-initialized').slick({
          slidesToShow: this.tabsCount,
          slidesToScroll: 1,
          initialSlide:
            this.slideStart >= 4
              ? this.slideStart > this.tabList.length - 4
                ? this.tabList.length - 4
                : this.slideStart
              : 0,
          infinite: false,
          dots: false,
          focusOnSelect: true,
          prevArrow:
            '<button type="button" class="slick-arrow slick-prev"><i class="fa fa-angle-left"></i></button>',
          nextArrow:
            '<button type="button" class="slick-arrow slick-next"><i class="fa fa-angle-right"></i></button>',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: this.tabsCount < 3 ? this.tabsCount : 3,
                slidesToScroll: 1,
                initialSlide:
                  this.slideStart >= 3
                    ? this.slideStart > this.tabList.length - 3
                      ? this.tabList.length - 3
                      : this.slideStart
                    : 0
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: this.tabsCount < 2 ? this.tabsCount : 2,
                slidesToScroll: 1,
                initialSlide:
                  this.slideStart >= 2
                    ? this.slideStart > this.tabList.length - 2
                      ? this.tabList.length - 2
                      : this.slideStart
                    : 0
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
        $slider[0].slick.slickGoTo(this.slideStart);
      }, 1);
    }
  }
}
