import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
declare var $: any;

@Component({
  selector: 'vvtk-model-gallery',
  templateUrl: './model-gallery.component.html',
  styleUrls: ['./model-gallery.component.scss']
})
export class ModelGalleryComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  tabsCount = 4;
  slideStart = 0;

  galleryOpen = false;

  @Input() tabList;

  constructor(@Inject(PLATFORM_ID) private platform_id) {}

  ngOnInit() {
    this.setHomeSlider();
  }

  setHomeSlider() {
    if (this.isBrowser) {
      require('slick-carousel');
      setTimeout(() => {
        const $slider = $('.gallery');
        const $sliderPup = $('.full-gallery');
        $slider.slick({
          slidesToShow: this.tabsCount,
          slidesToScroll: 1,
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
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: this.tabsCount < 2 ? this.tabsCount : 2,
                slidesToScroll: 1
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
        $sliderPup.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          prevArrow:
            '<button type="button" class="slick-arrow slick-prev"><i class="fa fa-angle-left"></i></button>',
          nextArrow:
            '<button type="button" class="slick-arrow slick-next"><i class="fa fa-angle-right"></i></button>'
        });
        $slider.find('a').on('click', function() {
          const _index = $slider.find('a').index(this);
          $sliderPup.slick('slickGoTo', _index);
        });
      }, 1);
      setTimeout(() => {
        const $this = $('#galleryPopup');
        const $sliderPup = $('.full-gallery');
        if ($this.outerHeight() > $(window).height() - 80) {
          $this.height($(window).height() * 0.8);
          $sliderPup.find('img').each(function() {
            $(this).css({ height: $(window).height() * 0.8, width: 'auto' });
          });
        }
        $this.css({
          'margin-left': -($this.width() / 2),
          'margin-top': -($this.outerHeight() / 2)
        });

        $(window).on('resize', function() {
          if ($this.outerHeight() > $(window).height() - 80) {
            $this.height($(window).height() * 0.8);
            $sliderPup.find('img').each(function() {
              $(this).css({ height: $(window).height() * 0.8, width: 'auto' });
            });
          }
          $this.css({
            'margin-left': -($this.width() / 2),
            'margin-top': -($this.outerHeight() / 2)
          });
        });
      }, 100);
    }
  }

  openGallery($event) {
    this.galleryOpen = true;
  }
  closeGallery($event) {
    this.galleryOpen = false;
  }
}
