import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import {
  AccountService,
  I18nService,
  VvtkService
} from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-register-verification',
  templateUrl: './register-verification.component.html',
  styleUrls: ['./register-verification.component.scss']
})
export class RegisterVerificationComponent implements OnInit {
  isServer: boolean = isPlatformServer(this.platform_id);
  email: string;
  message: string;
  isProcessing = false;

  paramSub$: Subscription;
  verifySub$: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private i18nService: I18nService,
    private vvtkService: VvtkService
  ) {}

  ngOnInit() {
    if (this.isServer) {
      return;
    } // Server side 不處理任何事

    this.paramSub$ = this.route.queryParams
      .pipe(
        catchError(error => {
          console.error('An error occurred', error);
          return of(error);
        }),
        finalize(() => {
          this.paramSub$.unsubscribe();
        })
      )
      .subscribe(params => {
        if (params['email']) {
          this.email = params['email'];
        } else {
          // 參數不正確
          this.router.navigateByUrl('/register');
        }

        if (params['from'] && params['from'] === 'login') {
          this.isProcessing = true;
          this.message = this.i18nService.getI18n(
            'Please verify your email before you log in.'
          );
        }

        if (params['code'] && params['email']) {
          this.isProcessing = true;
          this.message = this.i18nService.getI18n('Verifying…');
          this.verifySub$ = this.accountService
            .putRegisterVerify(params['email'], params['code'])
            .pipe(
              catchError(error => {
                console.error(error);
                return of(error);
              }),
              finalize(() => {
                this.verifySub$.unsubscribe();
              })
            )
            .subscribe(resp => {
              if (resp.ok) {
                this.router.navigateByUrl(`${this.i18nService.getSelectedLanguageForLink()}/register-complete`);
              } else {
                this.message = this.i18nService.getI18n(
                  'Email verification failed. Please send again.'
                );
              }
            });
        }
      });
  }

  /**
   * 重新寄送驗證信
   */
  resend() {
    const sub$ = this.accountService
      .putRegisterResend(
        this.email,
        this.vvtkService.nowLang || this.vvtkService.defaultLang,
        `${document.location.origin}/register-verification`
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
          alert(this.i18nService.getI18n('Resent'));
        } else {
          console.error(resp);
        }
      });
  }
}
