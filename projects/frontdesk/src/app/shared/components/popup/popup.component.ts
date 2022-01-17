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
import * as $ from 'jquery';

@Component({
  selector: 'vvtk-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  @Input() id;
  @Input() popupStyle;
  @Output() windowPopup = new EventEmitter<any>();
  constructor(@Inject(PLATFORM_ID) private platform_id) {}

  ngOnInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        const _height = 80;
        if (
          $('.vvtk-popup-wrap').outerHeight() >
          $(window).height() - _height
        ) {
          $('.vvtk-popup-wrap').height($(window).height() * 0.8);
          $('.video-wrap').css('padding-top', $(window).height() * 0.8);
        }
        $('.vvtk-popup-wrap').css({
          'margin-left': -($('.vvtk-popup-wrap').width() / 2),
          'margin-top': -($('.vvtk-popup-wrap').outerHeight() / 2)
        });

        $(window).on('resize', function() {
          if (
            $('.vvtk-popup-wrap').outerHeight() >
            $(window).height() - _height
          ) {
            $('.vvtk-popup-wrap').height($(window).height() * 0.8);
            $('.video-wrap').css('padding-top', $(window).height() * 0.8);
          }
          $('.vvtk-popup-wrap').css({
            'margin-left': -($('.vvtk-popup-wrap').width() / 2),
            'margin-top': -($('.vvtk-popup-wrap').outerHeight() / 2)
          });
        });
      }, 1);
    }
  }

  closePopup($event) {
    this.windowPopup.emit(false);
  }
}
