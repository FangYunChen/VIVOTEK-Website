import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'vvtk-text-card',
  templateUrl: './text-card.component.html',
  styleUrls: ['./text-card.component.scss']
})
export class TextCardComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  @Input() card;
  @Input() sectionBgColor;
  @Input() vvtkRouterLink;
  @Input() coverElementA = true;
  @Input() target;

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
}
