import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ExternalUserLoginViewModel } from '@frontdesk/core/interfaces/external-user-login-view-model';
import { Subscription, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AccountService,
  VvtkService,
  AuthService,
  I18nService
} from '@frontdesk/core/services';
import { RegisterForm } from '@frontdesk/core/interfaces';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formDisabled = true;
  alertMask = false;
  form: FormGroup;
  countries = [];
  countryLang = 'global';
  states = [];
  loadingShow: boolean;
  externalLoginData: ExternalUserLoginViewModel = null;

  eNewsSubscription = false;

  registerSub$: Subscription;
  countriesSub$: Subscription;
  lang: string;
  identityRoles = [
    'End User',
    'Reseller',
    'Distributor',
    'System Integrater',
    'OEM/ODM'
  ];

  constructor(
    private router: Router,
    private accountSrv: AccountService,
    private formBuilder: FormBuilder,
    private vvtkService: VvtkService,
    private authService: AuthService,
    private i18nService: I18nService
  ) {
    if (!this.authService.isServer) {
      // Client side 檢查就好
      this.authService.checkLogin().subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/'); // 已經登入的人不能來註冊頁
        }
      });
    }

    this.initForm();

    // 讀取是否有外部註冊資料
    const data = this.authService.getSessionStorage(
      this.authService.STORAGE_KEYS.EXTERNAL_LOGIN_DATA
    );
    if (data !== null) {
      this.externalLoginData = data as ExternalUserLoginViewModel;
      this.form.get('email').setValue(this.externalLoginData.email);
      this.form.get('firstName').setValue(this.externalLoginData.firstName);
      this.form.get('lastName').setValue(this.externalLoginData.lastName);
      this.form.removeControl('password');
      this.form.removeControl('checkPassword');
      // 如果外部登入資料有撈到 email，則無條件信任並且不讓 user 修改
      if (
        this.externalLoginData.email !== null &&
        this.externalLoginData.email.length > 0
      ) {
        this.form.get('email').disable();
      }
    }
  }

  ngOnInit() {
    this.initCountriesAndStates();
    this.i18nService.selectedLanguage$.subscribe(lang => this.lang = lang);
  }

  agreeForm(formDisabled) {
    this.formDisabled = !formDisabled;
  }

  next($event) {
    if (this.formDisabled && this.form.valid) {
      this.alertMask = !this.alertMask;
    } else {
      this.loadingShow = true;
      const isExternalRegister = this.externalLoginData !== null;
      const formData = this.form.value as RegisterForm;
      formData.lang = this.lang;
      formData.confirmUrl = `${document.location.origin}${this.i18nService.getSelectedLanguageForLink()}/register-verification`;

      // 補上外部登入資料
      if (isExternalRegister) {
        formData.email = this.form.get('email').disabled
          ? this.externalLoginData.email
          : formData.email;
        formData.externalAccessToken = this.externalLoginData.externalAccessToken;
        formData.provider = this.externalLoginData.provider;
        formData.providerKey = this.externalLoginData.providerKey;
      }

      const sub$ = this.accountSrv
        .register(formData, isExternalRegister)
        .pipe(
          catchError(error => {
            this.loadingShow = false;
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
            if (this.externalLoginData) {
              // 註冊成功，可以把 local storage 的暫存資料清除
              this.authService.removeSessionStorage(
                this.authService.STORAGE_KEYS.EXTERNAL_LOGIN_DATA
              );
            }
            if (/^true$/.test(resp.json()['emailConfirmed'])) {
              this.router.navigateByUrl(`${this.i18nService.getSelectedLanguageForLink()}/register-complete`);
            } else {
              this.router.navigateByUrl(
                `${this.i18nService.getSelectedLanguageForLink()}/register-verification?email=${formData.email}`
              );
            }
          }
        });
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      // 同步跟非同步的 validator 混用會讓非同步的失效，只好把同步的都改成非同步
      // 2016年已知的問題我還是遇到了，等待有緣人解決
      // https://stackoverflow.com/a/37168606/3547394
      email: [
        '',
        null,
        Validators.composeAsync([
          (ctrl: AbstractControl) => Promise.resolve(Validators.required(ctrl)),
          (ctrl: AbstractControl) =>
            Promise.resolve(
              Validators.pattern(this.accountSrv.usernameRegexPattern)(ctrl)
            ),
          (ctrl: AbstractControl) =>
            this.accountSrv.duplicatedUsernameValidator(ctrl)
        ])
      ],
      industryType: '',
      countryId: [null],
      identityRole: [''],
      lastName: ['',
      Validators.compose([
        Validators.required,
        (ctrl: AbstractControl) =>
          this.accountSrv.checktrimemptyValidator(ctrl),
          (ctrl: AbstractControl) =>
            this.accountSrv.checktextValidator(ctrl)
      ])],
      firstName: ['',
      Validators.compose([
        Validators.required,
        (ctrl: AbstractControl) =>
          this.accountSrv.checktrimemptyValidator(ctrl),
          (ctrl: AbstractControl) =>
            this.accountSrv.checktextValidator(ctrl)
      ])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      checkPassword: [
        '',
        Validators.compose([
          Validators.required,
          this.accountSrv.passwordRepeatValidator('password')
        ])
      ],
      phone: '',
      mobile: '',
      fax: '',
      website: '',
      source: '',
      company: ['',
      Validators.compose([
        Validators.required,
        (ctrl: AbstractControl) =>
          this.accountSrv.checktrimemptyValidator(ctrl)
      ])],
      department: '',
      title: '',
      stateId: '',
      city: '',
      address: '',
      eNewsSubscription: false
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
          }
        }
      }
    );
  }

  /**
   * 國家選單切換時 洲/省選單連動
   * @param {any} $event
   * @memberof RegisterComponent
   */
  countriesChanged($event) {
    const countryId = $event.target.value;
    this.states = [];
    for (const i of this.countries) {
      if (i.id === +countryId) {
        this.countryLang = i.langCode;
        this.states = i.states;
      }
    }
  }

  windowPopup($event) {
    this.alertMask = $event;
  }
}
