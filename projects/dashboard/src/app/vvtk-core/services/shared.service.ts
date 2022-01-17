import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from '../classes/language';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedLanguage = new BehaviorSubject<any>('global');
  selectedLanguage$ = this.selectedLanguage.asObservable();

  private languages = new BehaviorSubject<Language[]>([]);
  languages$ = this.languages.asObservable();

  // private pageModuleId = new BehaviorSubject<number>(0);
  // pageModuleId$ = this.pageModuleId.asObservable();

  pageModuleId = 0;
  pageIsEditable = false;

  constructor(private authService: AuthService) {}

  setSelectedLanguage(change: any) {
    this.selectedLanguage.next(change);
  }

  setLanguages(change: Language[]) {
    this.languages.next(change);
  }

  /**
   * 從 sidenav 過來的，儲存正在瀏覽頁面的 ModuleId 及此頁是否有編輯權限
   * @param change
   */
  setPageModuleId(change: number) {
    this.pageModuleId = change;
    this.pageIsEditable = this.authService.isEditable(change);
  }

  /**
   * 此頁/此模組是否有編輯權限
   * @param url
   */
  checkIsEditableByUrl(url: string) {
    return this.authService.isEditable(url);
  }

  /**
   * 此頁/此模組是否有閱讀權限
   * @param url
   */
  checkIsViewableByUrl(url: string) {
    return this.authService.isViewable(url);
  }
}
