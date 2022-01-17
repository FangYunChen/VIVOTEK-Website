import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsCampaignsPage } from '@frontdesk/core/classes/news/news-campaigns-page';
import { Subscription, of } from 'rxjs';
import { Collection } from '@frontdesk/core/collection.enum';
import {
  AccountService,
  VvtkService,
  PageMetaService
} from '@frontdesk/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-campaigns-page',
  templateUrl: './campaigns-page.component.html',
  styleUrls: ['./campaigns-page.component.scss']
})
export class CampaignsPageComponent implements OnInit {
  formDisabled = true;
  form: FormGroup;
  applyMask = false;
  doSuccess = false;
  doFail = false;
  loadingShow: boolean;
  formValid = true;
  id: any;
  _Content: NewsCampaignsPage;
  title: string;
  accountSub$: Subscription;
  routeParamsSub$: Subscription;

  public collection = Collection;

  constructor(
    private accountSrv: AccountService,
    formBuilder: FormBuilder,
    private vvtkService: VvtkService,
    private route: ActivatedRoute,
    private pageMetaSerice: PageMetaService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ])
      ],
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.routeParamsSub$ = this.route.params
      .pipe(
        catchError(error => {
          console.error('An error occurred', error);
          return of(error);
        }),
        finalize(() => {
          this.routeParamsSub$.unsubscribe();
        })
      )
      .subscribe(params => {
        this.id = params['id'] || this.route.snapshot.data['id'];
      });

    this.vvtkService.get(
      {
        path: `api/Campaign/${this.id}`,
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const content = resp.json();
            if (content) {
              this._Content = content;
              this.addBreadcrumbs(this._Content.title);
              if (this._Content.status !== 1) {
                this.router.navigate([
                  this.pageMetaSerice.getCustomPath('/404')
                ]);
              }
            }
          }
        },
        error: error => {
          console.error(
            'An error occurred in getNewsPage & NewsCampaigns',
            error
          );
          // TODO: 要做 跳到 找不到這個頁面 之後跳回第一頁新聞列表的功能
        }
      }
    );

    // 報名表單，如果使用者有登入就抓使用者的資料
    this.accountSub$ = this.accountSrv
      .getMyAccountData()
      .pipe(
        catchError(error => {
          console.error('An error occurred', error);
          return of(error);
        }),
        finalize(() => {
          this.accountSub$.unsubscribe();
        })
      )
      .subscribe(resp => {
        if (resp.ok) {
          const data = resp.json();
          this.form = new FormBuilder().group({
            email: [
              data.email,
              Validators.compose([
                Validators.required,
                Validators.pattern(
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                )
              ])
            ],
            name: [data.displayName, Validators.required],
            phone: [data.phoneNumber, Validators.required]
          });
        }
      });
  }

  next($event) {
    this.loadingShow = true;
    const sub$ = this.vvtkService
      .postCampaignParticipant(this.id, this.form.value)
      .pipe(
        catchError(error => {
          this.loadingShow = false;
          console.error(
            'An error occurred in postCampaignParticipant & this.id=' + this.id,
            error
          );
          console.error('Error : ' + error.json());
          return of(error);
        }),
        finalize(() => {
          this.loadingShow = false;
          sub$.unsubscribe();
        })
      )
      .subscribe(resp => {
        if (resp.ok) {
          this.loadingShow = false;
          this.doSuccess = true;
          this.doFail = false;
        } else {
          this.doFail = true;
        }
      });
  }

  applyOpen($event) {
    this.applyMask = true;
    this.doSuccess = false;
    this.doFail = false;
  }
  windowPopup($event) {
    this.applyMask = $event;
  }
  telFilter($event) {
    this.formValid = true;
    const tel: string = $event.target.value;
    if (tel.lastIndexOf('+') !== 0 && tel.lastIndexOf('+') !== -1) {
      this.formValid = false;
    }
    if (tel.lastIndexOf('-') === 0) {
      this.formValid = false;
    }
    tel.split('').forEach(t => {
      if (
        t.charCodeAt(0) !== 32 &&
        t.charCodeAt(0) !== 35 &&
        t.charCodeAt(0) !== 43 &&
        t.charCodeAt(0) !== 45 &&
        (t.charCodeAt(0) < 48 || t.charCodeAt(0) > 57)
      ) {
        this.formValid = false;
      }
    });
  }
  addBreadcrumbs(title: string) {
    this.title = title;
  }
}
