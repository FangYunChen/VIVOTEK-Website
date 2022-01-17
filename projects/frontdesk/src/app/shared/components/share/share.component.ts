import { isPlatformServer } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  RendererFactory2,
  ViewEncapsulation
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import {
  AuthHttpService,
  AuthService,
  VvtkService
} from '../../../vvtk-core/services';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'vvtk-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  isServer: boolean = isPlatformServer(this.platform_id);
  // 判斷有沒有打勾勾
  doCheck = false;
  // 判斷是不是機器人
  robotTesting = true;
  // 我不是機器人視窗mask
  robotMask = false;
  // 我不是機器人視窗box
  robotBox = true;
  // 加入收藏視窗mask
  collectionMask = false;

  // 頁面id
  // 1: News(新聞)
  // 2: Campaigns(活動)
  // 3: Cases(案例)
  // 4: Events(參展)
  // 5: CSRActitvies(CSR活動)
  // 6: Vacancies(職缺)
  @Input() categoryId: number = null;
  // 內容id
  @Input() pageId: number = null;

  @Input() mailTitle = '';

  constructor(
    @Inject(DOCUMENT) private document,
    @Inject(PLATFORM_ID) private platform_id,
    private authService: AuthService,
    private authHttpService: AuthHttpService,
    private vvtkService: VvtkService,
    private rendererFactory: RendererFactory2
  ) {}

  ngOnInit() {
    if (!this.isServer) {
      window['recaptchaCallback'] = this.recaptchaCallback.bind(this);
      this.recaptchaInit();
    }
  }

  robotWindow(mask) {
    this.robotMask = mask;
    this.doCheck = false;
    if (window['grecaptcha']) {
      // 把我不是機器人的勾勾取消
      window['grecaptcha'].reset();
      this.robotTesting = true;
    }
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

  doShare() {
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

    const win = window.open(
      'mailto:?subject='
        .concat(this.mailTitle)
        .concat('&body=Check out this site ')
        .concat(encodeURIComponent(document.title))
        .concat(' ')
        .concat(encodeURIComponent(location.href)),
      '',
      ''
    );
    setTimeout(function() {
      win.close();
    }, 500);

    setTimeout(() => {
      this.robotMask = !this.robotMask;
      this.doCheck = false;
      this.robotBox = true;
    }, 1000);
  }

  shareButton(targget: string, height?: number, width?: number) {
    if (!height) {
      height = 600;
    }
    if (!width) {
      width = 600;
    }
    const shareLink = encodeURIComponent(`${environment.apiUrl}/api/ShareLink/${this.categoryId}/${this.pageId}`);
    switch (targget) {
      case 'facebook':
        window.open(
          'https://www.facebook.com/share.php?u='.concat(shareLink),
          '',
          `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=${height},width=${width}`
        );
        break;
      case 'linkedin':
        window.open(
          'http://www.linkedin.com/shareArticle?mini=true&url='.concat(shareLink),
          '',
          `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=${height},width=${width}`
        );
        break;
      case 'twitter':
        window.open(
          'https://twitter.com/intent/tweet?url='.concat(shareLink),
          '',
          `menubar= no, toolbar = no, resizable = yes, scrollbars = yes, height = ${height}, width = ${width}`
        );
        break;
      case 'mail':
        this.robotWindow(true);
        break;
    }
  }

  addCollection() {
    const sub$ = this.authService
      .checkLogin()
      .pipe(
        finalize(() => {
          sub$.unsubscribe();
        })
      )

      .subscribe(isLogin => {
        if (isLogin) {
          if (this.categoryId && this.pageId) {
            const collection$ = this.authHttpService
              .patch('api/Collection', {
                cid: this.categoryId,
                id: this.pageId
              })
              .pipe(
                finalize(() => {
                  this.collectionMask = true;
                  collection$.unsubscribe();
                })
              )
              .subscribe();
          }
        } else {
          this.vvtkService.alertUserLogin(true);
        }
      });
  }

  windowPopup($event) {
    this.collectionMask = $event;
  }
}
