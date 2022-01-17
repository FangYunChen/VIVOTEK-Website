import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'vvtk-model-collapse',
  templateUrl: './model-collapse.component.html',
  styleUrls: ['./model-collapse.component.scss']
})
export class ModelCollapseComponent implements OnDestroy, OnChanges {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  @Input()
  collapseList: {
    content: string;
    list: {
      title: string;
      content: string;
    }[];
  } = {
    content: '',
    list: [{ title: '', content: '' }]
  };
  collapseIndex = -1;
  collapseOffset: any;

  constructor(@Inject(PLATFORM_ID) private platform_id) {}

  ngOnChanges() {
    if (this.isBrowser) {
      window.addEventListener('scroll', this.scroll, true);
      setTimeout(() => {
        $('.collapse .collapse-limit').each(function() {
          if (
            $(this)
              .find('.collapse-content')
              .height() > $(this).height()
          ) {
            $(this)
              .parents('.collapse-block')
              .addClass('text-limit');
          }
        });
        const blockOffset = [];
        $('.collapse-block').each(function() {
          blockOffset.push($(this).offset().top);
        });
        this.collapseOffset = blockOffset;
      }, 1);
    }
  }
  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.scroll, true);
    }
  }

  scroll(): void {
    if ($(window).scrollTop() > $('.model-collapse').offset().top) {
      const sidebarTop = -($('.model-collapse').offset().top - 20);
      $('.collapse-sidebar').animate({ top: sidebarTop }, 1);
    } else {
      $('.collapse-sidebar').css('top', 0);
    }
  }

  collapseOpen(idx) {
    if (this.collapseIndex !== idx) {
      this.collapseIndex = idx;
    } else {
      this.collapseIndex = -1;
    }
  }
  collapseTabs(el, idx) {
    $('html, body').animate({ scrollTop: this.collapseOffset[idx] }, 500);
    this.collapseIndex = -1;
  }
  goTop($event) {
    $('html, body').animate({ scrollTop: 0 }, 500);
  }
}
