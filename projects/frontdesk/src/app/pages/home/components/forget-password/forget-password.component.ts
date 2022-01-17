import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { AccountService, I18nService } from '@frontdesk/core/services';
import { ActivatedRoute } from '@angular/router';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'vvtk-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  isServer: boolean = isPlatformServer(this.platform_id);
  message: string;

  paramSub$: Subscription;
  pwdSub$: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private route: ActivatedRoute,
    private i18nService: I18nService,
    private accountSrv: AccountService
  ) { }

  ngOnInit() {
    if (this.isServer) {
      return; // Server side 不處理任何事
    }
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
        if (params['tk2'] && params['tk1']) {
          this.message = this.i18nService.getI18n('Validation...');
          this.pwdSub$ = this.accountSrv
            .getNewPassword(params['tk1'], params['tk2'])
            .pipe(
              catchError(error => {
                return of(error);
              }),
              finalize(() => {
                this.pwdSub$.unsubscribe();
              })
            )
            .subscribe(resp => {
              if (resp.ok) {
                this.message = this.i18nService.getI18n(
                  `Verification is successful. Your new password is '%s'. Please log in with the new password.`,
                  resp.json().password
                );
              } else {
                this.message = this.i18nService.getI18n(
                  'Verification failed. Please re-do [Forgot password].'
                );
              }
            });
        } else {
          this.message = this.i18nService.getI18n(
            'Verification failed. Incorrect parameter.'
          );
        }
      });
  }
}
