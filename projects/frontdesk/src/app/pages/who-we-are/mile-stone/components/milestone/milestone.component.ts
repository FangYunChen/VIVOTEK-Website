import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

declare var $: any;

@Component({
  selector: 'vvtk-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  // 顯示幾個分頁
  tabsPCCount = 6;
  tabsTableCount = 4;
  tabsMobileCount = 3;

  // 預設從第幾個分頁開始顯示
  slideStart = 0;

  tabsActive: number;
  yearList: number[] = [];

  dataList = {};

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService
  ) {}

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Milestones/List',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: any = resp.json();
            if (data && data.list) {
              const items: any[] = data.list;
              this.yearList = Array.from(
                new Set(items.map(element => element.year as number))
              );
              this.yearList = this.yearList.sort();
              this.tabsActive = this.yearList.length - 1;
              this.yearList.forEach(year => {
                this.dataList[year] = items.filter(
                  value => value.year === year
                );
                this.dataList[year].forEach(milestone => {
                  milestone.publishAt = new Date(
                    milestone.year,
                    milestone.month - 1
                  );
                });
              });
            }

            this.tabsPCCount = Math.min(this.yearList.length, this.tabsPCCount);
            this.slideStart = this.tabsActive;
            this.setHomeSlider();
          }
        }
      }
    );
  }

  tabsChange(year: number) {
    this.tabsActive = this.yearList.findIndex(y => (year as number) === y);
  }

  prevTab() {
    if (this.tabsActive > 0) {
      this.tabsActive--;
    }
  }

  nextTab() {
    if (this.tabsActive < this.yearList.length - 1) {
      this.tabsActive++;
    }
  }

  setHomeSlider() {
    if (this.isBrowser) {
      require('slick-carousel');
      setTimeout(() => {
        const $slider = $('.tabs-slider .tabs-slider-nav');
        const $sliderContent = $('.tabs-slider .tabs-slider-content');
        $slider.slick({
          slidesToShow: this.tabsPCCount,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          initialSlide: this.yearList.length - 1,
          focusOnSelect: true,
          asNavFor: '.tabs-slider .tabs-slider-content',
          prevArrow:
            '<button type="button" class="slick-arrow slick-prev"><i class="fa fa-angle-left"></i></button>',
          nextArrow:
            '<button type="button" class="slick-arrow slick-next"><i class="fa fa-angle-right"></i></button>',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                initialSlide: this.yearList.length - 1,
                slidesToShow: this.tabsTableCount
              }
            },
            {
              breakpoint: 768,
              settings: {
                initialSlide: this.yearList.length - 1,
                slidesToShow: this.tabsMobileCount
              }
            },
            {
              breakpoint: 480,
              settings: {
                initialSlide: this.yearList.length - 1,
                slidesToShow: 1
              }
            }
          ]
        });

        $sliderContent.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          adaptiveHeight: true,
          initialSlide: this.yearList.length - 1,
          asNavFor: '.tabs-slider .tabs-slider-nav',
          prevArrow:
            '<button type="button" class="slick-arrow slick-prev"><i class="fa fa-angle-left"></i></button>',
          nextArrow:
            '<button type="button" class="slick-arrow slick-next"><i class="fa fa-angle-right"></i></button>'
        });

        console.log(this.yearList.length);

        const $prevArrow = $('.slick-arrow.slick-prev');
        const $nextArrow = $('.slick-arrow.slick-next');

        $prevArrow.on('click', (e, args) => {
          this.prevTab();
        });
        $nextArrow.on('click', (e, args) => {
          this.nextTab();
        });
      }, 1);
      setTimeout(() => {
        $('.tabs-slider').fadeIn(500);
      }, 200);
    }
  }
}
