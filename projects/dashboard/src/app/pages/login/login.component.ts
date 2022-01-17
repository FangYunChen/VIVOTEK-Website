import { Component, HostBinding, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInAnimation } from '../../route.animation';
import {
  AuthService,
  UserLoginViewModel
} from '../../vvtk-core/services/auth.service';
import { ToolsService } from '../../vvtk-core/services/tools.service';

@Component({
  selector: 'vvtk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  email: string;
  password: string;
  remember = false;
  isChecking = false;
  redirect = '/';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toolsService: ToolsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['error']) {
        // 外部登入回傳錯誤訊息，可能為 user 沒有授權等等原因
        this.toolsService.showSnackBar(params['error']);
      } else if (params['externalAccessToken'] || params['id']) {
        // 外部登入 callback
        const redirectUri =
          this.authService.getSessionStorage(
            this.authService.STORAGE_KEYS.LOGIN_REDIRECT_URI
          ) || '/';
        const redirectUriGuest =
          '/login?error=請先於前台完成註冊手續後再登入(尚未註冊)';
        const redirectUriUnconfirmed =
          '/login?error=請先於前台完成註冊手續後再登入(尚未驗證Email)';
        this.authService.externalLogin(
          params,
          redirectUri,
          redirectUriGuest,
          redirectUriUnconfirmed
        );
      } else {
        this.redirect = decodeURIComponent(
          /login$/i.test(params['redirect']) ? '/' : params['redirect'] || '/'
        );
        this.authService.logout();
      }
    });
  }

  login() {
    const login$ = this.authService.login(
      this.email,
      this.password,
      this.remember,
      (resp: Response) => {
        const result = resp.json();
        if (resp.ok) {
          if (/^true$/i.test(resp.json().emailConfirmed)) {
            const user = result as UserLoginViewModel;
            this.toolsService.showSnackBar(
              `Login as ${user.displayName} success!`,
              3000
            );
            if (!this.authService.isViewable(this.redirect)) {
              // 要轉向的頁面有沒有權限，需要從 AuthService.UserPermissions 裡面拿一頁可以讀取的頁面讓 user 轉向
              for (const i in this.authService.userPermissions) {
                if (
                  this.authService.userPermissions[i][0] === 1 &&
                  this.authService.userPermissions[i][2] === 1
                ) {
                  const url = decodeURIComponent(i);
                  this.router.navigate([url.substr(1, url.length - 2)]);
                  return;
                }
              }
            }
            this.router.navigateByUrl(this.redirect);
          } else {
            this.toolsService.showSnackBar('帳號尚未通過信箱驗證');
          }
        } else if (result) {
          // this.toolsService.showSnackBar(
          //   `${result['error'] || 'API error'}: ${result['error_description'] ||
          //     result['message']}`
          // );
          alert(result.message);
        } else {
          this.toolsService.showSnackBar(`API Error!:Please try again later.`);
        }
      }
    );
  }

  adfsLogin() {
    // 把目前的 redirect url 存到 Session Storage 備用
    this.authService.setSessionStorage(
      this.authService.STORAGE_KEYS.LOGIN_REDIRECT_URI,
      this.redirect
    );
    const signinUrl = `${document.location.origin}/login`;
    document.location.href = this.authService.getExternalLoginUrl(
      signinUrl,
      'Federation'
    );
  }
}
