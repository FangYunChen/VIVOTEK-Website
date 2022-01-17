import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiEvent, ApiPath, LayoutMenuNode } from '../interfaces';
import { I18nService } from './i18n.service';
import { PageMetaService } from './page-meta.service';

@Injectable({
  providedIn: 'root'
})
export class VvtkService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public defaultLang = 'global';
  public nowLang = ''; // default is 'zh-tw'
  public apiUrl = `${environment.apiUrl}/`;

  /**
   * 儲存 LayoutMenuNode 的 Observable 物件，才能有效利用 Subject 機制避免一直重複 request
   * @private
   * @memberof VvtkService
   */
  private layoutMenuNode$ = {};

  private signPopup = new BehaviorSubject<boolean>(false);
  signPopup$ = this.signPopup.asObservable();

  constructor(
    private http: Http,
    private i18nService: I18nService,
    private pageMetaService: PageMetaService
  ) {
    // this.setLanguages();
    this.listenSelectedLanguage();
  }

  /**
   * 監聽 selectedLanguage
   */
  listenSelectedLanguage() {
    this.i18nService.selectedLanguage$.subscribe(selectedLanguage => {
      this.nowLang = selectedLanguage;
    });
  }

  get language(): string {
    return this.nowLang || this.defaultLang;
  }

  /**
   * GET
   * @deprecated
   * @param {ApiPath} apiPath {path: string; action?: string; query?: Object; language?: string;disableLanguage?: boolean}
   * @param {ApiEvent} [apiEvent={}] {next(value: Response); error(error: any); complete(); finally()}
   * @memberof VvtkService
   */
  public get(apiPath: ApiPath, apiEvent: ApiEvent = {}): any {
    const apiUrl: string = this.toUrl(apiPath);
    let data: any = null;
    const get$ = this.http
      .get(apiUrl)
      .pipe(
        finalize(() => {
          get$.unsubscribe();
          return data;
        })
      )
      .subscribe(
        (resp: Response) => {
          if (apiEvent.next) {
            apiEvent.next(resp);
          }
          data = resp;
        },
        error => {
          if (apiEvent.error) {
            apiEvent.error(error);
          }
        },
        () => {
          if (apiEvent.complete) {
            apiEvent.complete();
          }
        }
      );
  }

  toUrl(path: ApiPath): string {
    let api = path.path;
    api += path.disableLanguage
      ? ''
      : `/${path.language ? path.language : this.language}`;
    api += path.action ? `/${path.action}` : '';
    api += path.query ? `?${path.query}` : '';
    return `${environment.apiUrl}/${api}`;
  }

  /**
   * object to query string
   *
   * @private
   * @param {object} obj
   * @returns
   * @memberof VvtkService
   */
  public serialize(obj: Object) {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p) && encodeURIComponent(obj[p])) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }

  public getLayoutMenuNode(
    category: string,
    sucCallback: (suc) => void = null
  ): LayoutMenuNode[] {
    const key = `${category}_${this.language}`;
    if (this.layoutMenuNode$[key] === undefined) {
      this.layoutMenuNode$[key] = this.get(
        {
          path: `api/Menu/${category}`,
          disableLanguage: false
        },
        {
          next: resp => {
            sucCallback(resp);
            if (category === 'header') {
              this.pageMetaService.setHeaderMenuNode(resp.json());
            } else {
              this.pageMetaService.setFooterMenuNode(resp.json());
            }
          }
        }
      );
    } else {
      if (category === 'header') {
        this.pageMetaService.setHeaderMenuNode(this.layoutMenuNode$[key]);
      } else {
        this.pageMetaService.setFooterMenuNode(this.layoutMenuNode$[key]);
      }
    }
    return this.layoutMenuNode$[key];
  }

  /**
   * 投資人專區
   */
  public getInvestor(
    InvestorType: string,
    sucCallback: (suc) => void = null
  ): any {
    switch (InvestorType) {
      case 'architecture':
        InvestorType = 'Architecture/Publish';
        break;
      case 'director':
        InvestorType = 'Director/Publish';
        break;
      case 'committee':
        InvestorType = 'Committee/Publish';
        break;
      case 'manage':
        InvestorType = 'Manage';
        break;
      case 'operation':
        InvestorType = 'Operation';
        break;
      case 'regulations':
        InvestorType = 'Regulations';
        break;
      case 'month':
        InvestorType = '';
        break;
      case 'quarterly':
        InvestorType = '';
        break;
      case 'corporate':
        InvestorType = 'Corporate';
        break;
      case 'shareholder-list':
        InvestorType = 'Shareholder/Publish';
        break;
      case 'presentation':
        InvestorType = 'Investors/Presentation';
        break;
    }
    return this.get(
      {
        path: `api/${InvestorType}`,
        disableLanguage: false
      },
      {
        next: sucCallback
      }
    );
  }
  /**end投資人專區end**/

  /**StakeholderFAQ**/
  public getStakeholderFAQ(
    FAQType: string,
    parameter?: string,
    sucCallback: (suc) => void = null
  ): any {
    switch (FAQType) {
      case 'List':
        if (parameter) {
          FAQType = `List/${parameter}`;
        } else {
          FAQType = 'List';
        }
        break;
      case 'Category':
        if (parameter) {
          FAQType = `Category/${parameter}`;
        } else {
          FAQType = 'Category/List';
        }
        break;
    }
    return this.get(
      {
        path: `api/StakeholderFAQ/${FAQType}`,
        disableLanguage: false
      },
      {
        next: sucCallback
      }
    );
  }
  /**endStakeholderFAQend**/

  /**聯絡我們**/
  public getContact(
    ContactType: string,
    sucCallback: (suc) => void = null
  ): any {
    switch (ContactType) {
      case 'Subjects':
        ContactType = `Contact/Subjects/List`;
        break;
      case 'Office':
        ContactType = `Office/Headquarters`;
        break;
    }
    return this.get(
      {
        path: `api/${ContactType}`,
        disableLanguage: false
      },
      {
        next: sucCallback
      }
    );
  }
  /**end聯絡我們end**/

  /**
   * 關於我
   */
  /**取得各個關於我的頁面內容**/
  public getAbout(AboutType: string, sucCallback: (suc) => void = null): any {
    switch (AboutType) {
      case 'overview':
        AboutType = 'Overview';
        break;
      case 'social_responsibility':
        AboutType = 'Social';
        break;
      case 'legal':
        AboutType = 'Legal';
        break;
      case 'IntellectualProperty':
        AboutType = 'IntellectualProperty';
        break;
      case 'trademarks':
        AboutType = 'Trademarks';
        break;
      case 'PrivacyPolicy':
        AboutType = 'PrivacyPolicy';
        break;
      case 'TermsOfUse':
        AboutType = 'TermsOfUse';
        break;
    }
    return this.get(
      {
        path: `api/${AboutType}`,
        disableLanguage: false
      },
      {
        next: sucCallback
      }
    );
  }
  /**關於我**/

  /**
   * 財務資訊
   */
  public getFinance(
    FinanceType: string,
    sucCallback: (suc) => void = null
  ): any {
    switch (FinanceType) {
      case 'Month':
        FinanceType = 'Month';
        break;
      case 'Quarterly_Single':
        FinanceType = 'Quarterly/Single';
        break;
      case 'Quarterly_Consolidated':
        FinanceType = 'Quarterly/Consolidated';
        break;
    }
    return this.get(
      {
        path: `api/Finance/${FinanceType}/Publish/List`,
        disableLanguage: false
      },
      {
        next: sucCallback
      }
    );
  }
  /**end財務資訊end**/

  /**
   * 股東會相關資訊 (股東會、歷年股利、股務資訊)
   */
  public getShareholder(
    ShareholderType: string,
    sucCallback: (suc) => void = null
  ): any {
    switch (ShareholderType) {
      case 'Shareholder':
        ShareholderType = 'Shareholder';
        break;
      case 'Dividend':
        ShareholderType = 'Dividend';
        break;
      case 'Shareholding':
        ShareholderType = 'Shareholding';
        break;
    }
    return this.get(
      {
        path: `api/Investors/Shareholder/${ShareholderType}`,
        disableLanguage: false
      },
      {
        next: sucCallback
      }
    );
  }
  /**end股東會相關資訊 (股東會、歷年股利、股務資訊)end**/

  /**徵才模組**/
  public getCareers(
    CareersType: string,
    parameter?: string,
    sucCallback: (suc) => void = null
  ): any {
    switch (CareersType) {
      case 'Working':
        CareersType = 'Working';
        break;
      case 'Vacancies':
        if (parameter) {
          CareersType = `Vacancy/${parameter}`;
        } else {
          CareersType = 'Vacancies/List';
        }
        break;
    }
    return this.get(
      {
        path: `api/Careers/${CareersType}`,
        disableLanguage: false
      },
      {
        next: sucCallback
      }
    );
  }

  /**
   * 訂閱電子報
   */
  public putENewsSubscription(
    email: string,
    url: string
  ): Observable<Response> {
    // email 裡面的 '.' 如果放在網址的最後一段 IIS 會認不得導致 404，不要放最後一個(加一個斜線可解)
    return this.http.put(
      `${environment.apiUrl}/api/E-News/Subscriptions/${email}/`,
      {
        lang: this.language,
        confirmURL: url
      }
    );
  }

  /**end購買資訊end**/

  /**
   * 訂閱電子報的 Email 驗證
   */
  public putENewsSubscriptionVerify(
    email: string,
    code: string
  ): Observable<Response> {
    return this.http.put(
      `${environment.apiUrl}/api/E-News/Subscriptions/${email}/${code}`,
      {}
    );
  }

  public postCampaignParticipant(id: string, body: any): Observable<Response> {
    return this.http.post(
      this.apiUrl + `api/Campaign/Participant/${id}`,
      JSON.stringify(body),
      {
        headers: this.headers
      }
    );
  }

  // contact us有用到但被註解了
  public postContact(body: any): Observable<Response> {
    return this.http.post(
      this.apiUrl + `api/Contact/Form`,
      JSON.stringify(body),
      {
        headers: this.headers
      }
    );
  }

  public alertUserLogin(mask: boolean) {
    this.signPopup.next(mask);
  }
}
