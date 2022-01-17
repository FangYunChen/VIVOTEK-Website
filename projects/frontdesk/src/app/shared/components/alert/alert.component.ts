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
  selector: 'vvtk-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  @Input() id;
  @Input() alertStyle;
  @Output() windowPopup = new EventEmitter<any>();
  constructor(@Inject(PLATFORM_ID) private platform_id) {}

  ngOnInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        const _height = 80;
        if (
          $('.vvtk-alert-wrap').outerHeight() >
          $(window).height() - _height
        ) {
          $('.vvtk-alert-wrap').height($(window).height() * 0.8);
          $('.video-wrap').css('padding-top', $(window).height() * 0.8);
        }
        $('.vvtk-alert-wrap').css({
          'margin-left': -($('.vvtk-alert-wrap').width() / 2),
          'margin-top': -($('.vvtk-alert-wrap').outerHeight() / 2)
        });

        $(window).on('resize', function() {
          if (
            $('.vvtk-alert-wrap').outerHeight() >
            $(window).height() - _height
          ) {
            $('.vvtk-alert-wrap').height($(window).height() * 0.8);
            $('.video-wrap').css('padding-top', $(window).height() * 0.8);
          }
          $('.vvtk-alert-wrap').css({
            'margin-left': -($('.vvtk-alert-wrap').width() / 2),
            'margin-top': -($('.vvtk-alert-wrap').outerHeight() / 2)
          });
        });
      }, 1);
    }
  }

  closePopup($event) {
    // this.windowPopup.emit(false);
  }
}
