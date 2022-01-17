import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'vvtk-card-text',
  templateUrl: './card-text.component.html',
  styleUrls: ['./card-text.component.scss']
})
export class CardTextComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  @Input() card;
  @Input() cardsCount;
  @Input() sectionBgColor;
  @Input() vvtkRouterLink = [];
  @Input() coverElementA = true;
  @Input() target;

  openPopup = false;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    if (this.card.video) {
      const youtubeImg = `//img.youtube.com/vi/${
        this.card.video
        }/maxresdefault.jpg`;
      if (this.card.image) {
        this.card.image.src = youtubeImg;
      }
      if (this.card.img) {
        this.card.img.src = youtubeImg;
      }
    }
    // if (this.isBrowser) {
    //   setTimeout(() => {
    //     $('.limit').each(function () {
    //       const _height = $(this)
    //         .find('p')
    //         .height();
    //       const _limitHeight = $(this).height();
    //       if (_height > _limitHeight) {
    //         $(this).addClass('limitAfter');
    //       }
    //     });
    //   }, 1);
    // }
  }

  openVideo(id: string) {
    if (id) {
      this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.dangerousVideoUrl
      );
      this.openPopup = true;
    } else {
      this.openPopup = false;
    }
  }

  windowPopup($event) {
    this.openPopup = $event;
  }

  getClass() {
    switch (this.cardsCount.length) {
      case 4:
        return 'list-col list-col3';
      case 3:
        return 'list-col list-col4';
      case 2:
        return 'list-col list-col6';
      case 1:
        return 'list-col list-col12';
      default:
        return 'list-col list-col3';
    }
  }
}
