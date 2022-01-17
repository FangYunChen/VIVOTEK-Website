import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { I18nService, VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-newsletter-verification',
  templateUrl: './newsletter-verification.component.html',
  styleUrls: ['./newsletter-verification.component.scss']
})
export class NewsletterVerificationComponent implements OnInit {
  isServer: boolean = isPlatformServer(this.platform_id);
  message: string;

  paramSub$: Subscription;
  verifySub$: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private i18nService: I18nService
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
        if (params['code'] && params['email']) {
          this.message = this.i18nService.getI18n('Verifying…');
          this.verifySub$ = this.vvtkService
            .putENewsSubscriptionVerify(params['email'], params['code'])
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
                this.message = this.i18nService.getI18n(
                  'Verified email successfully and completed subscription.'
                );
              } else {
                this.message = this.i18nService.getI18n(
                  'Email verification failed. Please subscribe again.'
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
