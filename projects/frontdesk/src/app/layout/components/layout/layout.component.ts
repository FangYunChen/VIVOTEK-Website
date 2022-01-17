import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PageSettingService } from '@frontdesk/core/services/page-setting.service';
import { animationFrameScheduler, combineLatest, of, Subscription, timer } from 'rxjs';
import { catchError, filter, finalize, map, startWith, switchMap } from 'rxjs/operators';
import { UserLoginViewModel } from '../../../vvtk-core/interfaces/user-login-view-model';
import { VvtkService } from '../../../vvtk-core/services';
import { AuthService } from '../../../vvtk-core/services/auth.service';
import { PrivacyComponent } from '../privacy/privacy.component';

@Component({
  selector: 'vvtk-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  signMask = false; // sign
  forgetMask = false; // forget
  signRedirect: string;

  userSub$: Subscription;
  signPopup$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private vvtkService: VvtkService,
    private pageSettingService: PageSettingService,
    public snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS)
    private _defaultConfig: MatSnackBarConfig,
  ) {
    this.signPopup$ = this.vvtkService.signPopup$.subscribe(mask => {
      this.signMask = mask;
    });

    // 若 url 後有接參數 showLogin，則顯示登入頁面
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.showLogin) {
        this.signWindow(true);
        this.router.navigate(['./'], {
          relativeTo: this.route,
          queryParams: {showLogin: undefined},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
    });
  }

  ngOnInit() {
    if (!this.authService.isServer) {
      // Server side 不用載入用戶資訊，spider 不會登入
      this.loadUserData();
    }

    this.checkPrivacy();

    this.setSEOWhenRouteChange();
    this.fixFragmentNotWorkInRouterLink();
  }

  setSEOWhenRouteChange() {
    const languageChange = this.route.data.pipe(
      map(data => data.language),
    );
    const urlChange = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url),
      startWith(this.router.url),
    );

    combineLatest(languageChange, urlChange)
      .pipe(
        switchMap(([language, url]: [string, string]) =>
          this.pageSettingService.getPageSettingByPath(url)
        )
      )
      .subscribe(setting => {
        this.pageSettingService.setSEOTags(setting);
        this.pageSettingService.setCanonicalLink();
      });
  }

  // sign close & open
  signWindow(signMask) {
    this.signMask = signMask;
  }
  // forget close & open
  forgetWindow(forgetMask) {
    this.forgetMask = forgetMask;
  }

  /**
   * 讀取目前 user 資料
   * @memberof LayoutComponent
   */
  loadUserData() {
    this.userSub$ = this.authService
      .getUserData()
      .pipe(
        catchError(error => {
          console.error('An error occurred', error);
          return of(error);
        }),
        finalize(() => {
          if (this.userSub$) {
            this.userSub$.unsubscribe();
          }
        })
      )
      .subscribe(userData => {
        this.checkSignInRequest(userData);
      });
  }

  /**
   * 檢查是否需要 popup 登入視窗
   * (判斷是否有登入參數 'redirect'，若有則自動打開 sign-popup)
   * @memberof LayoutComponent
   */
  checkSignInRequest(userData: UserLoginViewModel) {
    const sub$ = this.route.queryParams
      .pipe(
        catchError(error => {
          console.error(error);
          return of(error);
        }),
        finalize(() => {
          sub$.unsubscribe();
        })
      )
      .subscribe(x => {
        const redirect = x['redirect']
          ? decodeURIComponent(x['redirect'] || '/')
          : null;
        if (redirect) {
          if (userData === null) {
            this.signRedirect = redirect;
            this.signWindow(true);
          } else {
            this.router.navigateByUrl(redirect);
          }
        }
      });
  }

  checkPrivacy() {
    const isCheckPrivacy = localStorage.getItem('isCheckPrivacy'); // TODO: 進階搭配後台管理"強制重新檢驗"
    if (!isCheckPrivacy) {
      setTimeout(() => {
        const snackBarRef = this.snackBar.openFromComponent(PrivacyComponent, {
          panelClass: ['privacy']
        });
        snackBarRef.onAction().subscribe(_ => {
          localStorage.setItem('isCheckPrivacy', 'true');
        });
      });
    }
  }

  private fixFragmentNotWorkInRouterLink() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url),
        startWith(this.router.url)
      )
      .subscribe(url => {
        const fragment = url.split('#')[1];
        timer(0, animationFrameScheduler).subscribe(() => {
          const targetElement = document.getElementById(fragment);
          if (targetElement) {
            targetElement.scrollIntoView();
          }
        });
      });
  }
}
