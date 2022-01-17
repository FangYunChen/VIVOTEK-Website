import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { I18nPipe } from '@frontdesk/shared/pipes/i18n.pipe';
import { Subscription, of } from 'rxjs';
import {
  AccountService,
  VvtkService,
  AuthService,
  AuthHttpService,
  I18nService
} from '@frontdesk/core/services';
import { Collection } from '@frontdesk/core/collection.enum';
import { RegisterForm, PasswordForm } from '@frontdesk/core/interfaces';
import { finalize, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplyAuthorityComponent } from './apply-authority/apply-authority.component';

@Component({
  selector: 'vvtk-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, AfterViewInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  formDisabled = true;
  form: FormGroup;
  passwordForm: FormGroup;
  hasNoPassword = false;

  countries = [];
  countryLang = 'global';
  states = [];
  pageCategory: string;
  pageName: string;
  bannerUrl: string;

  loadingShow: boolean;
  showBlock = '';
  recoverAuthSuccess = false;

  feebackMask: boolean;
  deleteMask = false;
  recoverAuthMask: boolean;

  i18n = new I18nPipe(this.i18nService);
  tabList = [
    this.i18n.transform('My Account'),
    this.i18n.transform('Change Password'),
    this.i18n.transform('Collection'),
    this.i18n.transform('Apply for Authority'),
    this.i18n.transform('Recover Authority')
  ];

  public collections = Object.keys(Collection)
    .map(k => Collection[k])
    .filter(k => !isNaN(Number(k)));
  public Collection = Collection;

  tabsCount = 5;
  cardList: { [category: number]: any[] } = {};
  tabsActive: string = 'tabs' + this.tabList[0];

  identityRoles = [
    'End User',
    'Reseller',
    'Distributor',
    'System Integrater',
    'OEM/ODM'
  ];

  countriesSub$: Subscription;

  @ViewChild(ApplyAuthorityComponent) private applyAuthorityComponent: ApplyAuthorityComponent;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private vvtkService: VvtkService,
    private authService: AuthService,
    private authHttpService: AuthHttpService,
    private i18nService: I18nService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initForm();
    this.initPasswordForm();
    this.loadUserData(null);
    this.initCountriesAndStates();
    this.loadColletion();
    this.editInfo(true);
    this.route.queryParams.subscribe((value) => {
      if (value['Auth'] === 'Anpr' || value['Auth'] === 'SDK') {
        this.tabsChange('tabsApply for Authority');
      }
      // console.log(value['Auth']);
    });
  }

  ngAfterViewInit() { }

  setHomeSlider() {
    if (this.isBrowser) {
      setTimeout(() => {
        ($('.tabs-slider .tabs-slider-nav') as any).slick({
          slidesToShow: this.tabsCount,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          focusOnSelect: true,
          prevArrow:
            '<button type="button" class="slick-arrow slick-prev"><i class="fa fa-angle-left"></i></button>',
          nextArrow:
            '<button type="button" class="slick-arrow slick-next"><i class="fa fa-angle-right"></i></button>',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      }, 1);
    }
  }

  editInfo(formDisabled) {
    this.formDisabled = formDisabled;
    for (const i in this.form.controls) {
      if (i === 'email') {
        continue; // email disabled 不會變
      }

      if (this.formDisabled) {
        this.form.controls[i].disable();
      } else {
        this.form.controls[i].enable();
      }
    }
  }

  cancelInfo() {
    this.editInfo(true);
    this.loadUserData(null);
  }

  doUpdate() {
    this.loadingShow = true;
    const formData = this.form.value as RegisterForm;
    formData.lang = this.countryLang;

    if (!this.form.controls['eNewsSubscription'].value) {
      const delete$ = this.authHttpService
        .delete(
          `api/E-News/Subscriptions/${this.form.controls['email'].value}/`
        )
        .pipe(
          finalize(() => {
            delete$.unsubscribe();
          })
        )
        .subscribe();
    }

    const sub$ = this.accountService
      .updateAccountInfo(formData)
      .pipe(
        catchError(err => of(err)),
        finalize(() => sub$.unsubscribe())
      )
      .subscribe(resp => {
        if (resp.ok) {
          this.loadUserData(data => {
            this.loadingShow = false;
            const userData = Object.assign({}, this.authService.userData);
            userData.displayName = data.displayName;
            userData.lang = data.lang;
            this.authService.setUserData(userData);
            this.editInfo(true);
          });
        }
      });
  }

  doUpdatePassword() {
    this.loadingShow = true;
    const formData = this.passwordForm.value as PasswordForm;
    formData.hasNoPassword = this.hasNoPassword;
    const sub$ = this.accountService
      .updateAccountPassword(formData)
      .pipe(
        catchError(err => of(err)),
        finalize(() => sub$.unsubscribe())
      )
      .subscribe(resp => {
        if (resp.ok) {
          this.feebackMask = true;
          this.showBlock = '';
          setTimeout(() => {
            this.loadingShow = false;
            this.hasNoPassword = false;
            this.initPasswordForm();
          }, 2000);

          // 登出後導到登入頁面
          this.authService.logout();
          this.router.navigate(['/'], { queryParams: { showLogin: 'true' }, queryParamsHandling: 'merge'});
        } else {
          if (resp.status === 404) {
            this.feebackMask = true;
            this.showBlock = 'failure';
            setTimeout(() => {
              this.loadingShow = false;
            }, 2000);
          }
        }
      });
  }

  tabsChange(tabsActive) {
    this.tabsActive = tabsActive;
    if (tabsActive === 'tabsMy Account') {
      this.loadUserData(null);
    }
    if (tabsActive === 'tabsApply for Authority') {
      this.applyAuthorityComponent.ngOnInit();
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [{ value: '', disabled: this.formDisabled }],
      industryType: [{ value: '', disabled: this.formDisabled }],
      countryId: [
        { value: '', disabled: this.formDisabled },
        Validators.required
      ],
      identityRole: [
        { value: '', disabled: this.formDisabled },
        Validators.required
      ],
      lastName: [
        { value: '', disabled: this.formDisabled },
        Validators.compose([
          Validators.required,
          (ctrl: AbstractControl) =>
            this.accountService.checktrimemptyValidator(ctrl),
            (ctrl: AbstractControl) =>
              this.accountService.checktextValidator(ctrl)
        ])
      ],
      firstName: [
        { value: '', disabled: this.formDisabled },
        Validators.compose([
          Validators.required,
          (ctrl: AbstractControl) =>
            this.accountService.checktrimemptyValidator(ctrl),
            (ctrl: AbstractControl) =>
              this.accountService.checktextValidator(ctrl)
        ])
      ],
      phone: { value: '', disabled: this.formDisabled },
      mobile: { value: '', disabled: this.formDisabled },
      fax: { value: '', disabled: this.formDisabled },
      website: { value: '', disabled: this.formDisabled },
      source: { value: '', disabled: this.formDisabled },
      company: { value: '', disabled: this.formDisabled },
      department: { value: '', disabled: this.formDisabled },
      title: { value: '', disabled: this.formDisabled },
      stateId: { value: '', disabled: this.formDisabled },
      city: { value: '', disabled: this.formDisabled },
      address: { value: '', disabled: this.formDisabled },
      eNewsSubscription: { value: '', disabled: this.formDisabled }
    });
  }

  initCountriesAndStates() {
    this.vvtkService.get(
      {
        path: 'api/Countries/Real',
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            this.countries = resp.json();
            if (
              this.form.controls['countryId'] &&
              this.form.controls['countryId'].value > 0
            ) {
              this.countriesChanged(this.form.controls['countryId'].value);
            }
          }
        }
      }
    );
  }

  loadUserData(callback: (data: any) => void | null) {
    const sub$ = this.accountService
      .getMyAccountData()
      .pipe(
        catchError(err => of(err)),
        finalize(() => sub$.unsubscribe())
      )
      .subscribe(resp => {
        if (resp.ok) {
          const data = resp.json();
          // tslint:disable-next-line:forin
          for (const i in this.form.controls) {
            this.form.controls[i].setValue(data[i] || '');
          }
          this.form.controls['phone'].setValue(data.phoneNumber);
          this.countriesChanged(data.countryId);

          // 使用外部登入註冊沒有密碼
          if (data.hasNoPassword) {
            this.hasNoPassword = true;
            this.passwordForm.removeControl('oldPassword');
          }
        }

        const eNews$ = this.authHttpService
          .get('api/E-News/Subscriptions/User')
          .pipe(
            finalize(() => {
              eNews$.unsubscribe();
            })
          )
          .subscribe(eNewsResp => {
            if (eNewsResp.ok) {
              const subscription = eNewsResp.json() as boolean;
              this.form.controls['eNewsSubscription'].setValue(subscription);
              if (typeof callback === 'function') {
                callback(resp.ok ? resp.json() : null);
              }
            }
          });
      });
  }

  /**
   * 國家選單切換時 洲/省選單連動
   * @param {any} $event
   * @memberof RegisterComponent
   */
  countriesChanged($event) {
    const countryId = typeof $event === 'object' ? $event.target.value : $event;
    this.states = [];
    for (const i of this.countries) {
      if (i.id === countryId) {
        this.countryLang = i.langCode;
        this.states = i.states;
      }
    }
  }

  loadColletion() {
    const sub$ = this.authHttpService
      .get(`api/Collection/List/${this.vvtkService.language}`)
      .pipe(finalize(() => sub$.unsubscribe()))
      .subscribe(resp => {
        if (resp.ok) {
          const data: any[] = resp.json();
          if (data && data.length > 0) {
            data.forEach(category => {
              this.cardList[category.cid] = category.list;
            });
          }
        }
      });
  }

  deleteCollection(cid: number, id: number) {
    const sub$ = this.authHttpService
      .delete(`api/Collection/${cid}/${id}`)
      .pipe(
        finalize(() => {
          this.cardList[cid] = this.cardList[cid].filter(
            card => card.id !== id
          );
          this.deleteMask = true;
          sub$.unsubscribe();
        })
      )

      .subscribe();
  }
  deletePopup($event) {
    this.deleteMask = $event;
  }
  windowPopup($event) {
    this.feebackMask = $event;
  }
  recoverAuthPopup($event) {
    this.recoverAuthMask = $event;
  }

  initPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      oldPassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      checkPassword: [
        '',
        Validators.compose([
          Validators.required,
          this.accountService.passwordRepeatValidator('password')
        ])
      ]
    });
  }

}
