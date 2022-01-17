import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModelImgCarouselDialogComponent } from './../model-img-carousel-dialog/model-img-carousel-dialog.component';
declare var $: any;

@Component({
  selector: 'vvtk-model-img-carousel',
  templateUrl: './model-img-carousel.component.html',
  styleUrls: ['./model-img-carousel.component.scss']
})
export class ModelImgCarouselComponent implements OnInit {

  @Input()
  title;

  @Input()
  content;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.setPictureSlider();
  }

  setPictureSlider() {
    require('slick-carousel');
    $('.slider').slick('unslick');
    setTimeout(() => {
      $('.slider').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 800,
        dots: true,
        focusOnSelect: true,
        arrows: true,
        prevArrow:
          '<button type="button" style="top:110px" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
        nextArrow:
          '<button type="button" style="top:110px" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
          }
        ]
      });
    }, 1);
  }

  showImageDialog(index) {
    this.dialog.open(ModelImgCarouselDialogComponent, {
      data: {
        index: index,
        content: this.content
      }
    });
  }
}
