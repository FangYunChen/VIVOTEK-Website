import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { finalize } from 'rxjs/operators';
import { ApiEvent, ApiPath } from '../classes/api';
import { Language } from '../classes/language';
import {
  AuthHttpService,
  AuthService,
  SysModuleViewModel
} from './auth.service';
import { SharedService } from './shared.service';
import { ToolsService } from './tools.service';

// var mime = require('mime-types');

@Injectable({
  providedIn: 'root'
})
export class VvtkService {
  private languages: Language[];
  private language: string;
  constructor(
    private http: Http,
    private authService: AuthService,
    private toolsService: ToolsService,
    private sharedService: SharedService,
    private authHttp: AuthHttpService
  ) {
    this.listenSelectedLanguage();
  }

  /**
   * 監聽 selectedLanguage
   */
  listenSelectedLanguage() {
    this.sharedService.selectedLanguage$.subscribe(selectedLanguage => {
      this.language = selectedLanguage;
    });
  }

  /**
   * 取得 languages 存到 shared.service
   */
  setLanguages() {
    this.get(
      {
        path: 'api/Languages',
        disableLanguage: true,
        query: {
          scope: 'all'
        }
      },
      {
        next: languages => {
          this.languages = languages.json();
          this.sharedService.setLanguages(this.languages);
        }
      }
    );
  }

  /**
   * GET
   * @deprecated
   * @param {ApiPath} apiPath {path: string; action?: string; query?: Object; language?: string;disableLanguage?: boolean}
   * @param {ApiEvent} apiEvent {next(value: Response); error(error: any); complete(); finally()}
   * @param {successMag} string 成功訊息
   * @memberof VvtkService
   */
  get(apiPath: ApiPath, apiEvent: ApiEvent = {}, successMag: string = null) {
    const apiUrl = this.apiPath2Url(apiPath);
    const get$ = this.authHttp
      .get(apiUrl)
      .pipe(
        finalize(() => {
          get$.unsubscribe();
          (apiEvent.finally || function () { })();
        })
      )
      .subscribe(
        resp => {
          (apiEvent.next || function () { })(resp);
          if (successMag) {
            this.toolsService.showSnackBar(successMag, 3000);
          }
        },
        error => {
          (apiEvent.error || function () { })(error);
          this.toolsService.apiError(error);
        },
        () => {
          (apiEvent.complete || function () { })();
        }
      );
  }

  /**
   * POST
   * @deprecated
   * @param {ApiPath} apiPath {path: string; action?: string; query?: Object; language?: string;disableLanguage?: boolean}
   * @param {*} [data=null]
   * @param {ApiEvent} apiEvent {next(value: Response); error(error: any); complete(); finally()}
   * @param {successMag} string 成功訊息
   * @memberof VvtkService
   */
  post(
    apiPath: ApiPath,
    data: any = null,
    apiEvent: ApiEvent = {},
    successMag: string = 'save success'
  ) {
    const apiUrl = this.apiPath2Url(apiPath);
    this.authHttp
      .post(apiUrl, data)
      .pipe(
        finalize(() => {
          (apiEvent.finally || function () { })();
        })
      )
      .subscribe(
        resp => {
          (apiEvent.next || function () { })(resp);
          if (successMag) {
            this.toolsService.showSnackBar(successMag, 3000);
          }
        },
        error => {
          (apiEvent.error || function () { })(error);
          this.toolsService.apiError(error);
        },
        () => {
          (apiEvent.complete || function () { })();
        }
      );
  }

  /**
   * PATCH
   * @deprecated
   * @param {ApiPath} apiPath {path: string; action?: string; query?: Object; language?: string;disableLanguage?: boolean}
   * @param {*} [data=null]
   * @param {ApiEvent} apiEvent {next(value: Response); error(error: any); complete(); finally()}
   * @param {successMag} string 成功訊息
   * @memberof VvtkService
   */
  patch(
    apiPath: ApiPath,
    data: any = null,
    apiEvent: ApiEvent = {},
    successMag: string = 'save success'
  ) {
    const apiUrl = this.apiPath2Url(apiPath);
    this.authHttp
      .patch(apiUrl, data)
      .pipe(
        finalize(() => {
          (apiEvent.finally || function () { })();
        })
      )
      .subscribe(
        resp => {
          (apiEvent.next || function () { })(resp);
          if (successMag) {
            this.toolsService.showSnackBar(successMag, 3000);
          }
        },
        error => {
          (apiEvent.error || function () { })(error);
          this.toolsService.apiError(error);
        },
        () => {
          (apiEvent.complete || function () { })();
        }
      );
  }

  /**
   * PUT
   * @deprecated
   * @param {ApiPath} apiPath {path: string; action?: string; query?: Object; language?: string;disableLanguage?: boolean}
   * @param {*} [data=null]
   * @param {ApiEvent} apiEvent {next(value: Response); error(error: any); complete(); finally()}
   * @param {successMag} string 成功訊息
   * @memberof VvtkService
   */
  put(
    apiPath: ApiPath,
    data: any = null,
    apiEvent: ApiEvent = {},
    successMag: string = 'save success'
  ) {
    const apiUrl = this.apiPath2Url(apiPath);
    this.authHttp
      .put(apiUrl, data)
      .pipe(
        finalize(() => {
          (apiEvent.finally || function () { })();
        })
      )
      .subscribe(
        resp => {
          (apiEvent.next || function () { })(resp);
          if (successMag) {
            this.toolsService.showSnackBar(successMag, 3000);
          }
        },
        error => {
          (apiEvent.error || function () { })(error);
          this.toolsService.apiError(error);
        },
        () => {
          (apiEvent.complete || function () { })();
        }
      );
  }

  /**
   * DELETE
   * @deprecated
   * @param {ApiPath} apiPath {path: string; action?: string; query?: Object; language?: string;disableLanguage?: boolean}
   * @param {ApiEvent} apiEvent {next(value: Response); error(error: any); complete(); finally()}
   * @param {successMag} string 成功訊息
   * @memberof VvtkService
   */
  delete(
    apiPath: ApiPath,
    apiEvent: ApiEvent = {},
    successMag: string = 'delete success'
  ) {
    const apiUrl = this.apiPath2Url(apiPath);
    const delete$ = this.authHttp
      .delete(apiUrl)
      .pipe(
        finalize(() => {
          (apiEvent.finally || function () { })();
        })
      )
      .subscribe(
        resp => {
          (apiEvent.next || function () { })(resp);
          if (successMag) {
            this.toolsService.showSnackBar(successMag, 3000);
          }
        },
        error => {
          (apiEvent.error || function () { })(error);
          this.toolsService.apiError(error);
        },
        () => {
          (apiEvent.complete || function () { })();
        }
      );
  }

  /**
   * postFormData
   *
   * @param {ApiPath} apiPath
   * @param {*} [data=null]
   * @param {ApiEvent} [apiEvent={}]
   * @param {successMag} string 成功訊息
   * @memberof VvtkService
   */
  postFormData(
    apiPath: ApiPath,
    data: any = null,
    apiEvent: ApiEvent = {},
    successMag: string = 'save success'
  ) {
    data = this.toolsService.dataToFormData(data);
    this.post(apiPath, data, apiEvent, successMag);
  }

  // #region 權限
  /**
   *
   * @deprecated
   * @param url
   * @param apiEvent
   * @param successMag
   */
  getEditableAccountsByUrl(
    url: string,
    apiEvent: ApiEvent = {},
    successMag: string = null
  ) {
    this.get(
      {
        path: `api/Accounts/IsEditable`,
        disableLanguage: true,
        query: {
          id: this.getModuleIdByUrl(url)
        }
      },
      apiEvent,
      successMag
    );
  }
  /**
   * 由 url 取得 ModuleId
   * @deprecated
   * @param url
   */
  getModuleIdByUrl(url: string, modules: SysModuleViewModel[] = null) {
    if (modules == null) {
      const userData = this.authService.userData;
      modules = userData && userData['modules'] ? userData.modules : [];
    }

    for (const i of modules) {
      if (new RegExp(`^${i.route}$`).test(url)) {
        return i.id;
      } else if (i.childModules && i.childModules.length > 0) {
        const result = this.getModuleIdByUrl(url, i.childModules);
        if (result) {
          return result;
        }
      }
    }

    return 0;
  }
  // #endregion

  // #region 其他
  /**
   * object to query string
   *
   * @private
   * @param {object} obj
   * @returns
   * @memberof VvtkService
   */
  private serialize(obj: object) {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p) && encodeURIComponent(obj[p])) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }

  apiPath2Url(apiPath: ApiPath) {
    let apiUrl = apiPath.path;
    apiUrl += apiPath.disableLanguage
      ? ''
      : `/${apiPath.language ? apiPath.language : this.language}`;
    apiUrl += apiPath.action ? `/${apiPath.action}` : '';
    apiUrl += apiPath.query ? `?${this.serialize(apiPath.query)}` : '';
    return apiUrl;
  }
  // #endregion
}
