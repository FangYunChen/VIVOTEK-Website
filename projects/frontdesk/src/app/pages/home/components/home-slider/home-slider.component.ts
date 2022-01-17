import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HomeSlider } from '@frontdesk/core/interfaces';
import { VvtkService } from '@frontdesk/core/services';
declare var $: any;

@Component({
  selector: 'vvtk-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  sliderItems: HomeSlider[] = [];
  rwdDevice = '';
  windowWidth: number;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService
  ) {}

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
    this.vvtkService.get(
      {
        path: 'api/Home/Sliders',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            this.setHomeSlider(resp.json());
          }
        }
      }
    );
  }

  setHomeSlider(_sliderItems: HomeSlider[]) {
    this.sliderItems = _sliderItems;
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
        $('.full-slider .slider-item-img').each(function() {
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
