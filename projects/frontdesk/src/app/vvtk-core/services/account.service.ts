import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  ForgetPasswordForm,
  PasswordForm,
  RegisterForm,
  RecoveryAuthForm
} from '../interfaces';
import { AuthHttpService } from './auth-http.service';
import { VvtkApiService } from './vvtk-api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  /**
   * 檢查 username 是否符合格式 (email)
   * @memberof AccountService
   */
  usernameRegexPattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
  checkTextRegexPattern =  /^[\w\u4e00-\u9fa5] $/gi;
  htmlRegexPattern = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;

  constructor(
    private http: Http,
    private authHttp: AuthHttpService,
    private vvtkApiService: VvtkApiService
  ) { }

  /**
   * 註冊帳號
   * @param {RegisterForm} form
   * @memberof AccountService
   */
  register(
    form: RegisterForm,
    isExternalRegister: boolean
  ): Observable<Response> {
    return this.authHttp.post(`api/Accounts`, form);
  }

  /**
   * 檢查 Email 是否已被使用
   * @param {AbstractControl} username
   * @returns
   * @memberof AccountService
   */
  duplicatedUsernameValidator(username: AbstractControl) {
    if (!this.usernameRegexPattern.test(username.value)) {
      return of(null);
    }

    return this.http
      .get(`${environment.apiUrl}/api/Accounts/${username.value}/Exists`)
      .pipe(
        map(resp => {
          return resp.ok && resp.text() === 'false'
            ? null
            : { duplicatedUsername: true };
        })
      );
  }

  /**
   * 不可空白
   * @param {AbstractControl} ctrl
   * @returns

   */
  checktrimemptyValidator(ctrl: AbstractControl) {
    if(ctrl.value.trim() == '')
      return {
        required: true
      };
  }

  /**
   * 檢查
   * @param {AbstractControl} ctrl
   * @returns

   */
   checktextValidator(ctrl: AbstractControl) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    　　if (pattern.test(ctrl.value)){
    　　　　return of(null);
    　　}
  }

  /**
   * 檢查兩次密碼輸入是否相符
   * @param otherCtrlName
   */
  passwordRepeatValidator(otherCtrlName: string): ValidatorFn {
    return (ctrl: AbstractControl): { [key: string]: any } => {
      if (!ctrl.parent) {
        return null;
      }

      const thisCtrl = ctrl;
      const checkCtrl = ctrl.parent.get(otherCtrlName) as AbstractControl;

      if (thisCtrl.value === checkCtrl.value) {
        return null;
      }
      return {
        validateNotEqual: true
      };
    };
  }

  /**
   * 註冊的 Email 驗證
   */
  public putRegisterVerify(email: string, code: string): Observable<Response> {
    return this.http.put(
      `${environment.apiUrl}/api/Accounts/${email}/${code}`,
      {}
    );
  }

  /**
   * 重新寄送驗證信
   */
  public putRegisterResend(
    email: string,
    lang: string,
    url: string
  ): Observable<Response> {
    return this.http.put(
      `${
      environment.apiUrl
      }/api/Accounts/${email}/Resend?lang=${lang}&url=${url}`,
      {}
    );
  }

  /**
   * 取得 User 自己的資訊
   */
  public getMyAccountData(): Observable<Response> {
    return this.authHttp.get(`api/Accounts/Me`);
  }

  /**
   * 更新 User 自己的資訊
   * @param {RegisterForm} form
   * @returns {Observable<Response>}
   * @memberof AccountService
   */
  public updateAccountInfo(form: RegisterForm): Observable<Response> {
    return this.authHttp.patch(`api/Accounts/Me`, form);
  }

  /**
   * 更新 User 自己的密碼
   * @param {PasswordForm} form
   * @returns {Observable<Response>}
   * @memberof AccountService
   */
  public updateAccountPassword(form: PasswordForm): Observable<Response> {
    return this.authHttp.patch(`api/Accounts/Me/password`, form);
  }

  /**
   * 更新 User 自己的密碼
   * @param {ForgetPasswordForm} form
   * @returns {Observable<Response>}
   * @memberof AccountService
   */
  public forgetPassword(form: ForgetPasswordForm): Observable<Response> {
    return this.authHttp.post(`api/Accounts/ForgetPassword`, form);
  }

  /**
   * 忘記密碼的 Email 驗證與取得新密碼
   */
  public getNewPassword(email: string, code: string): Observable<Response> {
    return this.http.get(
      `${environment.apiUrl}/api/Accounts/ForgetPassword?tk1=${email}&tk2=${code}`
    );
  }

  /**
   * 恢復舊官網權限
   * @param {RecoveryAuthForm} form
   * @returns {Observable<Boolean>}
   * @memberof AccountService
   */
  public recoverAuth(form: RecoveryAuthForm): Observable<Boolean> {
    return this.vvtkApiService.post<Boolean>({
      path: 'api/Accounts/RecoverAuthority',
      disableLanguage: true,
      needAuth: true
    }, form);
  }
}
