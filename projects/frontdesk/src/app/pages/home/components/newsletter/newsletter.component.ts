import { isPlatformServer } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  RendererFactory2,
  ViewEncapsulation
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  robotMask = false;
  robotTesting = true;
  email: string;
  isServer: boolean = isPlatformServer(this.platform_id);
  noMail = true;
  doSuccess = false;
  doCheck = false;
  robotBox = true;

  constructor(
    @Inject(DOCUMENT) private document,
    @Inject(PLATFORM_ID) private platform_id,
    private rendererFactory: RendererFactory2,
    private vvtkService: VvtkService
  ) {}

  ngOnInit() {
    if (!this.isServer) {
      window['recaptchaCallback'] = this.recaptchaCallback.bind(this);
      this.recaptchaInit();
    }
  }

  // robot close & open
  robotWindow(email) {
    this.robotMask = !this.robotMask;
    this.doCheck = false;
    if (email) {
      this.noMail = false;
      this.robotBox = false;
      if (window['grecaptcha']) {
        // 把我不是機器人的勾勾取消
        window['grecaptcha'].reset();
        this.robotTesting = true;
      }
    } else {
      this.noMail = true;
      this.robotBox = true;
    }
  }

  doSubscribe() {
    if (this.robotTesting) {
      this.doCheck = true;
      // alert('請先點選"我不是機器人"');
      return;
    } else {
      this.doCheck = false;
    }

    if (this.isServer) {
      return; // 這邊 Server 不可能也不可以執行到，接下來要用 document 物件會爆炸
    }

    const sub$ = this.vvtkService
      .putENewsSubscription(
        this.email,
        `${document.location.origin}/newsletter/verification`
      )
      .pipe(
        catchError(error => {
          console.error(error);
          return of(error);
        }),
        finalize(() => {
          sub$.unsubscribe();
        })
      )
      .subscribe(resp => {
        if (resp.ok) {
          this.robotBox = true;
          this.doSuccess = true;
          setTimeout(() => {
            this.robotMask = !this.robotMask;
            this.noMail = true;
            this.doSuccess = false;
            this.doCheck = false;
            this.robotBox = true;
          }, 1000);
        } else {
          alert(resp.json().error_description);
        }
      });
  }

  /**
   * 初始化 reCaptcha v2
   * https://stackoverflow.com/questions/34974947/angular-2-recaptcha-2-callback
   * @memberof NewsletterComponent
   */
  recaptchaInit() {
    try {
      const renderer = this.rendererFactory.createRenderer(this.document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });
      const script = renderer.createElement('script');
      // TODO: 根據目前語系去設定 api.js 語系參數 hl，目前設為 en
      // 參照 https://developers.google.com/recaptcha/docs/language
      renderer.setAttribute(script, 'name', 'rechaptchav2');
      renderer.setAttribute(
        script,
        'src',
        'https://www.google.com/recaptcha/api.js?hl=en'
      );
      renderer.appendChild(this.document.body, script);
    } catch (e) {
      console.error('Error within NewsletterComponent : ', e);
    }
  }

  /**
   * 我不是機器人打勾之後 標示已通過機器人測試
   * @memberof NewsletterComponent
   */
  recaptchaCallback() {
    this.robotTesting = false;
  }
}
