import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { VvtkApiService } from '@frontdesk/core/services';
import { saveAs } from 'file-saver/FileSaver';
declare var $: any;

@Component({
  selector: 'vvtk-model-img-carousel-dialog',
  templateUrl: './model-img-carousel-dialog.component.html',
  styleUrls: ['./model-img-carousel-dialog.component.scss']
})
export class ModelImgCarouselDialogComponent implements OnInit {

  content;
  currentIndex = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private vvtkApiService: VvtkApiService
  ) { }

  ngOnInit() {
    this.content = this.data.content.images;
    this.currentIndex = this.data.index;
    require('slick-carousel');
    setTimeout(() => {
      $('.slider-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 800,
        dots: false,
        focusOnSelect: true,
        arrows: true,
        prevArrow:
          '<button type="button" style="top:45%;height:10%" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
        nextArrow:
          '<button type="button" style="top:45%;height:10%" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
        initialSlide: this.data.index,
      });
      $('.slider-nav').on('afterChange', (event, slick, currentSlide) => {
        this.currentIndex = currentSlide;
      });
    }, 1);
  }

  downloadPicture() {
    const fileUrl = this.content[this.currentIndex].src as string;
    const fileName = fileUrl.split('/').reverse()[0];
    this.vvtkApiService
      .downloadFileByPost({
        path: `api/DownloadFile`,
        disableLanguage: true
      }, { url: fileUrl })
      .subscribe(blob => {
        saveAs(blob, fileName);
      });
  }

}
