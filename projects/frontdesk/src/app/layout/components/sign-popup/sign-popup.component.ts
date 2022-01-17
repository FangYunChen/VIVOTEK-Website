import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { UserLoginViewModel } from '../../../vvtk-core/interfaces';
import { AuthService, VvtkService, I18nService } from '../../../vvtk-core/services';

@Component({
  selector: 'vvtk-sign-popup',
  templateUrl: './sign-popup.component.html',
  styleUrls: ['./sign-popup.component.scss']
})
export class SignPopupComponent implements OnInit {
  @Input() signMask; // sign
  @Input() forgetMask; // forget
  @Output() signWindow = new EventEmitter<any>(); // sign
  @Output() forgetWindow = new EventEmitter<any>(); // forget
  @Input() signRedirect;

  email: string;
  password: string;
  remember = false;
  oauthUrl = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private vvtkService: VvtkService,
    private injector: Injector,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.getExternalLoginUrls();

    // 儲存登入後要導向的頁面網址進 local storage，供登入完成後使用
    this.authService.setSessionStorage(
      this.authService.STORAGE_KEYS.LOGIN_REDIRECT_URI,
      this.signRedirect || this.router.routerState.snapshot.url
    );
  }

  /**
   * 取得外部登入連結
   * @memberof SignPupopComponent
   */
  getExternalLoginUrls() {
    const origin = this.authService.isServer
      ? this.injector.get('origin')
      : document.location.origin;
    const signinUrl = `${origin}/external-signin`;
    this.oauthUrl['facebook'] = this.authService.getExternalLoginUrl(
      signinUrl,
      'Facebook'
    );
    this.oauthUrl['google'] = this.authService.getExternalLoginUrl(
      signinUrl,
      'Google'
    );
    this.oauthUrl['linkedIn'] = this.authService.getExternalLoginUrl(
      signinUrl,
      'LinkedIn'
    );
    this.oauthUrl['federation'] = this.authService.getExternalLoginUrl(
      signinUrl,
      'Federation'
    );
  }

  // sign close
  closeSign($event) {
    this.signMask = false;
    this.vvtkService.alertUserLogin(this.signMask);
    this.signWindow.emit(this.signMask);
  }

  signIn() {
    this.authService.login(
      this.email,
      this.password,
      this.remember,
      (resp: Response) => {
        const data = resp.json();
        if (resp.ok) {
          const userData = resp.json() as UserLoginViewModel;
          if (/^true$/i.test(userData.emailConfirmed)) {
            this.router.navigateByUrl(
              this.signRedirect || this.router.routerState.snapshot.url
            );
            this.authService.removeSessionStorage(
              this.authService.STORAGE_KEYS.LOGIN_REDIRECT_URI
            );
          } else {
            this.router.navigateByUrl(
              `/register-verification?email=${resp.json().email}&from=login`
            );
          }
          this.closeSign(null);
        } else {
          if (data && data.message) {
            alert(data.message);
          } else {
            alert('API Error! Please try again later.');
          }
        }
      }
    );
  }

  forgetPassword($event) {
    this.signMask = false;
    this.forgetMask = true;
    this.signWindow.emit(this.signMask);
    this.forgetWindow.emit(this.forgetMask);
  }

  register() {
    this.signMask = false;
    this.signWindow.emit(this.signMask);
    window.open(this.i18nService.getSelectedLanguageForLink() + '/register');
  }
}
