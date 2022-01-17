import { isPlatformServer } from '@angular/common';
import {
  Inject,
  Injectable,
  Injector,
  PLATFORM_ID,
  isDevMode
} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { DOCUMENT } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { catchError, take } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * 權限服務
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: Http,
    private injector: Injector,
    @Inject(DOCUMENT) private document,
    @Inject(PLATFORM_ID) private platform_id
  ) { }

  /**
   * 目前執行環境是否爲 Server
   */
  get isServer(): boolean {
    return isPlatformServer(this.platform_id);
  }
  private _isServer = isPlatformServer(this.platform_id);

  /**
   * 目前登入的 user 資料
   */
  get userData(): UserLoginViewModel {
    if (typeof this._userData === 'undefined') {
      const data = this.getSessionStorage(this.STORAGE_KEYS.USER);
      this._userData = data == null ? null : (data as UserLoginViewModel);
    }
    return this._userData;
  }
  private _userData: UserLoginViewModel;

  get userPermissions(): any {
    if (typeof this._userPermissions === 'undefined') {
      const data = this.getSessionStorage(this.STORAGE_KEYS.PERMISSIONS);
      this._userPermissions = data == null ? {} : data;
    }
    return this._userPermissions;
  }
  private _userPermissions: any;

  /**
   * Api URL
   */
  get URLS() {
    return {
      LOGIN: `${environment.apiUrl}/Login`,
      LOGOUT: `${environment.apiUrl}/Logout`,
      EXTERNAL_LOGIN: `${environment.apiUrl}/ExternalLogin`
    };
  }

  /**
   * Local/Session Storage Keys
   */
  get STORAGE_KEYS() {
    return {
      USER: 'user',
      LOGGED_OUT_USER: 'loggedOutUser',
      LOGIN_REDIRECT_URI: 'loginRedirectUri',
      EXTERNAL_LOGIN_DATA: 'externalLoginData',
      PERMISSIONS: 'permissions'
    };
  }

  /**
   * 登入
   * @param username 帳號
   * @param password 密碼
   * @param remember 記住我
   */
  login(
    username: string,
    password: string,
    remember: boolean,
    callback: Function
  ) {
    if (this.isServer) {
      return; // 不會在 Server side 執行 login & Server side 沒有 URLSearchParams 會炸
    }

    const sub$ = this.http
      .post(
        this.URLS.LOGIN,
        {
          username: username,
          password: password,
          remember: remember
        },
        { withCredentials: true }
      )
      // .subscribe(
      //   (resp: Response) => {
      //     if (resp.ok) {
      //       const userData = resp.json() as UserLoginViewModel;
      //       if (/^true$/i.test(userData.emailConfirmed)) {
      //         this.setUserData(userData);
      //       }
      //     }
      //     callback(resp);
      //   },
      //   error => {
      //     this.logout(); // 登入發生錯誤，先清空 cookie 做登出
      //     return of(error);
      //   }
      // );
      .pipe(
        catchError(error => {
          this.logout(); // 登入發生錯誤，先清空 cookie 做登出
          return of(error);
        })
      )
      .subscribe(
        async (resp: Response) => {
          if (resp.ok) {
            const userData = (await resp.json()) as UserLoginViewModel;
            if (/^true$/i.test(userData.emailConfirmed)) {
              this.setUserData(userData);
            }
          }
          callback(resp);
        },
        error => {},
        () => {
          sub$.unsubscribe();
        }
      );
  }

  /**
   * 登出
   */
  logout() {
    if (this.isServer) {
      return; // 不會在 Server side 執行 logout
    }

    // 是否需清除 api, adfs 上的 cookie
    const cleanupApiCookie =
      this.getSessionStorage(this.STORAGE_KEYS.LOGGED_OUT_USER) == null;

    // 清除自己的 cookie, storage,...
    this.removeSessionStorage(this.STORAGE_KEYS.USER);
    this.removeSessionStorage(this.STORAGE_KEYS.PERMISSIONS);
    this.setSessionStorage(this.STORAGE_KEYS.LOGGED_OUT_USER, true);
    this._userData = null;

    if (cleanupApiCookie) {
      document.location.href = `${
        this.URLS.LOGOUT
        }?redirect=${encodeURIComponent(document.location.href)}`;
    }
  }

  /**
   * 取得外部登入連結
   * @param redirectUri 登入後跳轉頁面網址
   * @param provider 外部登入提供商名稱 Facebook, Google, LinkedIn
   */
  getExternalLoginUrl(redirectUri: string, provider: string) {
    return (
      `${this.URLS.EXTERNAL_LOGIN}/${provider}` +
      (this.URLS.EXTERNAL_LOGIN.indexOf('?') > -1
        ? `&redirectUri=${redirectUri}`
        : `?redirectUri=${redirectUri}`)
    );
  }

  /**
   * 外部登入
   * @param {any} queryParams
   * @param {any} redirectUri
   * @param {any} registerUri
   * @memberof AuthService
   */
  externalLogin(queryParams, redirectUri, registerUri, registerConfirmUri) {
    if (queryParams['id']) {
      // api 回傳的是已註冊的 user 資料
      const userData = queryParams as UserLoginViewModel;
      if (/^true$/i.test(userData.emailConfirmed)) {
        // 執行登入後返回登入前的頁面
        this.removeSessionStorage(this.STORAGE_KEYS.LOGGED_OUT_USER);
        this.getUserData()
          .pipe(take(1))
          .subscribe(
            (userLoginData: UserLoginViewModel) => {
              this.setUserData(userLoginData);
              if (redirectUri.indexOf('http') === 0) {
                document.location.href = redirectUri;
              } else {
                this.router.navigateByUrl(redirectUri);
              }
            },
            error => { },
            () => { }
          );
      } else {
        // 還沒通過 Email 驗證不能登入
        registerConfirmUri +=
          registerConfirmUri.indexOf('?') > -1
            ? '&'
            : '?' + `email=${userData.email}&from=login`;
        this.router.navigateByUrl(registerConfirmUri);
      }
    } else {
      // api 回傳的是外部供應商的 user 資料，表示沒有找到已註冊資料
      // 將外部資料存到 session storage 待用，轉到註冊頁面
      this.setSessionStorage(
        this.STORAGE_KEYS.EXTERNAL_LOGIN_DATA,
        queryParams
      );
      this.router.navigateByUrl(registerUri);
    }
  }

  setUserData(userData: UserLoginViewModel) {
    if (userData.modules) {
      // 只留 environment 設定的 authTypeModule 節省空間
      const filtered = [];
      for (const i of userData.modules) {
        if (environment.authGuardModuleTypes.indexOf(i.type) > -1) {
          filtered.push(i);
        }
      }
      userData.modules = filtered;

      this._userData = userData;
      this._userPermissions = this.getPermissions({}, userData.modules);
      this.setSessionStorage(this.STORAGE_KEYS.USER, userData);
      this.setSessionStorage(
        this.STORAGE_KEYS.PERMISSIONS,
        this._userPermissions
      );
      this.removeSessionStorage(this.STORAGE_KEYS.LOGGED_OUT_USER);
      this.removeSessionStorage(this.STORAGE_KEYS.LOGIN_REDIRECT_URI);
    } else {
      console.error('Can not get auth modules.');
    }
  }

  /**
   * 將 SysModuleViewModel[] 資料轉成 { regexForRoute: [ isViewable, isEditable, isVisible ] } 的物件
   * 供 AuthGuard 檢查頁面權限使用（將樹狀階層平面化並減少儲存大小）
   */
  private getPermissions(permissions: {}, modules: SysModuleViewModel[]) {
    for (const i of modules) {
      if (
        i.route &&
        i.route.length > 0 &&
        environment.authGuardModuleTypes.indexOf(i.type) > -1
      ) {
        let r = (i.route.indexOf('/') === 0 ? i.route : '/' + i.route).replace(
          '\\\\',
          '\\'
        );
        if (r.indexOf('?') > -1) {
          r = r.substr(0, r.indexOf('?'));
        }
        permissions[encodeURIComponent('^' + r + '$')] = [
          i.isViewable ? 1 : 0,
          i.isEditable ? 1 : 0,
          i.isVisible ? 1 : 0
        ];
      }
      if (i.childModules.length > 0) {
        permissions = this.getPermissions(permissions, i.childModules);
      }
    }
    return permissions;
  }

  getUserData(): Observable<UserLoginViewModel> {
    if (this.userData == null) {
      if (this.isServer) {
        return of(null); // 搜尋引擎不會登入所以沒資料沒差
      }

      if (this.getSessionStorage(this.STORAGE_KEYS.LOGGED_OUT_USER) != null) {
        return of(null);
      } else {
        return this.http.get(this.URLS.LOGIN, { withCredentials: true }).pipe(
          catchError(error => {
            return of(error);
          }),
          map(resp => {
            if (resp.ok) {
              const userData = resp.json() as UserLoginViewModel;
              if (/^true$/i.test(userData.emailConfirmed)) {
                this.setUserData(userData);
                return userData;
              }
            }
            this.setSessionStorage(this.STORAGE_KEYS.LOGGED_OUT_USER, true);
            return null;
          })
        );
      }
    } else {
      return of(this.userData);
    }
  }

  /**
   * 檢查 user 是否有登入
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  checkLogin(): Observable<boolean> {
    if (this.isServer) {
      // server side 就不用再去跟 api 確認了，先假設都有讓 user 可以進頁面
      // 刷前端的時候就會logout，api 也會做權限控制 不會讓爬蟲爬到機密資料
      return of(true);
    } else if (this.userData == null) {
      // 要去跟 API 要 userData
      return this.getUserData().pipe(
        map((userData: UserLoginViewModel) => {
          if (userData != null && /^true$/i.test(userData.emailConfirmed)) {
            return true;
          } else {
            this.logout(); // 發生錯誤，先清空 cookie 做登出
            return false;
          }
        })
      );
    } else {
      // 有登入
      return of(true);
    }
  }

  /**
   * 此頁/此模組是否有閱讀權限
   * @param {(string | number)} urlOrModuleId RouterStateSnapshot.url / Module Id
   * @returns {boolean}
   */
  isViewable(urlOrModuleId: string | number): boolean {
    return typeof urlOrModuleId === 'number'
      ? this.checkPermissionByModuleId(urlOrModuleId, 0)
      : this.checkPermissionByUrl(urlOrModuleId, 0);
  }

  /**
   * 此頁/此模組是否有編輯權限
   * @param {(string | number)} urlOrModuleId RouterStateSnapshot.url / Module Id
   * @returns {boolean}
   */
  isEditable(urlOrModuleId: string | number): boolean {
    return typeof urlOrModuleId === 'number'
      ? this.checkPermissionByModuleId(urlOrModuleId, 1)
      : this.checkPermissionByUrl(urlOrModuleId, 1);
  }

  /**
   * 此頁/此模組是否有顯示在 Sidenav 上
   * @param {(string | number)} urlOrModuleId RouterStateSnapshot.url / Module Id
   * @returns {boolean}
   */
  isVisible(urlOrModuleId: string | number): boolean {
    return typeof urlOrModuleId === 'number'
      ? this.checkPermissionByModuleId(urlOrModuleId, 2)
      : this.checkPermissionByUrl(urlOrModuleId, 2);
  }

  /**
   * 依照輸入 url 檢查 session storage: permissions 看看有沒有對應權限
   */
  private checkPermissionByUrl(url: string, slot: number): boolean {
    if (url.indexOf('?') > -1) {
      url = url.substr(0, url.indexOf('?'));
    }

    for (const i in this.userPermissions) {
      if (new RegExp(decodeURIComponent(i)).test(url)) {
        return this.userPermissions[i][slot] === 1;
      }
    }
    return false;
  }

  /**
   * 依照輸入 module id 檢查 session storage: userData.modules 看看有沒有對應權限
   */
  private checkPermissionByModuleId(
    id: number,
    slot: number,
    modules: SysModuleViewModel[] = null
  ): boolean {
    if (modules == null) {
      modules =
        this.userData && this.userData['modules'] ? this.userData.modules : [];
    }
    for (const i of modules) {
      if (i.id === id) {
        switch (slot) {
          case 0:
            return i.isViewable;
          case 1:
            return i.isEditable;
          case 2:
            return i.isVisible;
          default:
            return false;
        }
      } else if (i.childModules && i.childModules.length > 0) {
        const result = this.checkPermissionByModuleId(id, slot, i.childModules);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  /**
   * @param {string} key 以哪個屬性對應userData.id
   */
  excludeSelf(key: string = 'id') {
    return y => y[key] !== this.userData.id;
  }

  /**
   * 設定 Cookie
   * @param {string} name
   * @param {string} value
   * @param {(string | Date)} [expires]
   * @memberof AuthService
   */
  setCookie(name: string, value: string, expires?: string | Date): void {
    if (this.isServer) {
      // 應該不會有在 server 端設 cookie 的需求，先跳過
    } else {
      let cookie = `${name}=${value};path=/;`;
      if (typeof expires === 'string') {
        cookie += `expires=${expires};`;
      } else if (typeof expires === 'object' && expires instanceof Date) {
        cookie += `expires=${expires.toUTCString()};`;
      }
      document.cookie = cookie;
    }
  }

  /**
   * 取得 Cookie
   * @param {string} name
   * @returns {string}
   * @memberof AuthService
   */
  getCookie(name: string): string {
    const regex = /(([^\s;]+)\=([^;]+);?)/g;
    const cookies = this.isServer
      ? this.injector.get('request')['headers']['cookie'] || ''
      : this.document.cookie;

    let match = null;
    while ((match = regex.exec(cookies)) != null) {
      if (match[2] === name) {
        return match[3];
      }
    }
    return null;
  }

  /**
   * 移除 Cookie
   * @param {string} name
   * @memberof AuthService
   */
  removeCookie(name: string): void {
    this.setCookie(name, '', new Date(2000, 1, 1).toUTCString());
  }

  /**
   * 設定 Local Storage 值
   * @param {string} name
   * @param {*} value
   * @memberof AuthService
   */
  setLocalStorage(name: string, value: any) {
    if (!this.isServer) {
      this.setBrowserStorage(localStorage, name, value);
    }
  }

  /**
   * 取得 Local Storage 值
   * @param {string} name
   * @param {boolean} [autoParse=true] 自動解析為物件
   * @returns {*}
   * @memberof AuthService
   */
  getLocalStorage(name: string, autoParse = true): any {
    if (!this.isServer) {
      return this.getBrowserStorage(localStorage, name, autoParse);
    }
  }

  /**
   * 移除 Local Storage
   * @param {string} name
   * @memberof AuthService
   */
  removeLocalStorage(name: string) {
    if (!this.isServer) {
      localStorage.removeItem(name);
    }
  }

  /**
   * 設定 Session Storage 值
   * @param {string} name
   * @param {*} value
   * @memberof AuthService
   */
  setSessionStorage(name: string, value: any) {
    if (!this.isServer) {
      this.setBrowserStorage(sessionStorage, name, value);
    }
  }

  /**
   * 取得 Session Storage 值
   * @param {string} name
   * @param {boolean} [autoParse=true] 自動解析為物件
   * @returns {*}
   * @memberof AuthService
   */
  getSessionStorage(name: string, autoParse = true): any {
    if (!this.isServer) {
      return this.getBrowserStorage(sessionStorage, name, autoParse);
    }
  }

  /**
   * 移除 Session Storage
   * @param {string} name
   * @memberof AuthService
   */
  removeSessionStorage(name: string) {
    if (!this.isServer) {
      sessionStorage.removeItem(name);
    }
  }

  /**
   * 在瀏覽器 Storage 裡設定值
   * @param {Storage} storage localStorage 或 sessionStorage
   * @param {string} name storage key
   * @param {*} value
   */
  private setBrowserStorage(storage: Storage, name: string, value: any) {
    if (this.isServer) {
      return;
    }

    try {
      switch (typeof value) {
        case 'object':
          storage.setItem(name, JSON.stringify(value));
          break;
        case 'boolean':
        case 'number':
        case 'string':
        case 'symbol':
          storage.setItem(name, value as any);
          break;
        case 'function': // function 可以儲存嗎?
        case 'undefined':
        default:
          return;
      }
    } catch (ex) {
      if (isDevMode()) {
        console.error(ex);
      }
    }
  }

  /**
   * 從瀏覽器 Storage 裡取得值
   * @param {Storage} storage localStorage 或 sessionStorage
   * @param {string} name storage key
   * @param {boolean} [autoParse=true] storage 裡面只能存字串，如果是 json 字串是否要自動轉換成 object?
   */
  private getBrowserStorage(storage: Storage, name: string, autoParse = true) {
    const value = storage.getItem(name);
    if (autoParse && /^\s*[{|\[].*[}|\]]\s*/.test(value)) {
      try {
        const jsonObj = JSON.parse(value || 'null');
        return jsonObj;
      } catch (ex) {
        if (isDevMode()) {
          console.error(ex);
        }
      }
    }
    return value;
  }
}

/**
 * 權限警衛
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.checkLogin().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          if (this.authService.isViewable(state.url)) {
            // 已登入、有權限
            return true;
          } else {
            // 已登入、沒權限
            const navigationExtras: NavigationExtras = {
              queryParams: {
                request: state.url
              }
            };
            this.router.navigate(
              [environment.forbiddenRedirectRoute],
              navigationExtras
            );
            return false;
          }
        } else {
          // 沒有登入
          const navigationExtras: NavigationExtras = {
            queryParams: {
              redirect: state.url
            }
          };
          this.router.navigate(
            [environment.unauthorizedRedirectRoute],
            navigationExtras
          );
          return false;
        }
      })
    );
  }
}

/**
 * 登入警衛
 * @export
 * @class LoginGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.checkLogin().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn === false) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              redirect: state.url
            }
          };
          this.router.navigate(
            [environment.unauthorizedRedirectRoute],
            navigationExtras
          );
        }
        return isLoggedIn;
      })
    );
  }
}

/**
 * 需要送出驗證資訊的 Http 工具
 * @export
 * @class AuthHttpService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: Http, private authService: AuthService) { }

  get(
    api: string,
    isSubject = true,
    headers = new Headers()
  ): Observable<Response> {
    return this.getSubjectObservableResponse(
      this.http.get(`${environment.apiUrl}/${api}`, {
        headers: headers,
        withCredentials: true
      }),
      isSubject
    );
  }

  post(
    api: string,
    data: any,
    isSubject = true,
    headers = new Headers()
  ): Observable<Response> {
    return this.getSubjectObservableResponse(
      this.http.post(`${environment.apiUrl}/${api}`, data, {
        headers: headers,
        withCredentials: true
      }),
      isSubject
    );
  }

  put(
    api: string,
    data: any,
    isSubject = true,
    headers = new Headers()
  ): Observable<Response> {
    return this.getSubjectObservableResponse(
      this.http.put(`${environment.apiUrl}/${api}`, data, {
        headers: headers,
        withCredentials: true
      }),
      isSubject
    );
  }

  patch(
    api: string,
    data: any,
    isSubject = true,
    headers = new Headers()
  ): Observable<Response> {
    return this.getSubjectObservableResponse(
      this.http.patch(`${environment.apiUrl}/${api}`, data, {
        headers: headers,
        withCredentials: true
      }),
      isSubject
    );
  }

  delete(
    api: string,
    isSubject = true,
    headers = new Headers()
  ): Observable<Response> {
    return this.getSubjectObservableResponse(
      this.http.delete(`${environment.apiUrl}/${api}`, {
        headers: headers,
        withCredentials: true
      }),
      isSubject
    );
  }

  private getSubjectObservableResponse(
    resp$: Observable<Response>,
    isSubject: boolean
  ): Observable<Response> {
    if (isSubject) {
      const subj$ = new Subject<Response>();
      resp$.subscribe(subj$);
      return subj$;
    } else {
      return resp$;
    }
  }
}

/**
 * 使用者登入資訊
 */
export class UserLoginViewModel {
  /**
   * 使用者 ID
   */
  id: string;

  /**
   * 使用者顯示名稱
   */
  displayName: string;

  /**
   * 使用者 Email
   */
  email: string;

  /**
   * 使用者 Email 是否通過驗證
   */
  emailConfirmed: string;

  /**
   * 使用者註冊語系
   */
  lang: string;

  /**
   * 已授權系統模組內容
   */
  modules: SysModuleViewModel[];
}

/**
 * 外部登入結果
 */
export class ExternalUserLoginViewModel {
  /**
   * 外部 OAuth 供應商
   */
  provider: string;

  /**
   * 外部 OAuth ID
   */
  providerKey: string;

  /**
   * 外部 OAuth 存取 token
   */
  externalAccessToken: string;

  /**
   * 姓
   */
  firstName: string;

  /**
   * 名
   */
  lastName: string;

  /**
   * Email
   */
  email: string;
}

/**
 * 已授權系統模組內容
 */
export class SysModuleViewModel {
  /**
   * 模組編號
   */
  id: number;

  /**
   * 模組類型(BackendModule: 後台模組; FrontendModule: 前台模組)
   */
  type: string;

  /**
   * 模組名稱
   */
  name: string;

  /**
   * 選單圖示
   */
  icon: string;

  /**
   * 路由路徑
   */
  route: string;

  /**
   * 上層模組編號
   */
  parentId: number;

  /**
   * 位置
   */
  position: number;

  /**
   * 選單提示泡泡文字
   */
  badge: string;

  /**
   * 選單提示泡泡顏色
   */
  badgeColor: string;

  /**
   * 自訂CSS類別
   */
  customClass: string;

  /**
   * 是否為可見選單
   */
  isVisible: boolean;

  /**
   * 具有可讀權限
   */
  isViewable: boolean;

  /**
   * 具可寫權限
   */
  isEditable: boolean;

  /**
   * 子選單
   */
  childModules: SysModuleViewModel[];
}
