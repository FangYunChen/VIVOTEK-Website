import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreenVivotekService {
  private pageId = new BehaviorSubject<number>(null);
  pageId$ = this.pageId.asObservable();

  private pageTitle = new BehaviorSubject<string>('');
  pageTitle$ = this.pageTitle.asObservable();

  constructor() {}

  setPageId(pageId: number) {
    this.pageId.next(pageId);
  }

  setPageTitle(pageTitle: string) {
    this.pageTitle.next(pageTitle);
  }
}
