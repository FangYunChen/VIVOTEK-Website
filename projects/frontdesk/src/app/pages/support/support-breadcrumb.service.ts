import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SupportBreadcrumbService {

  private root = '/support';
  rootPath$: BehaviorSubject<string> = new BehaviorSubject<string>(this.root);
  contentPageTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get rootPath(): string {
    return this.rootPath$.value;
  }

  set path(path: string) {
    this.rootPath$.next(this.root + path);
  }

  get contentPageTitle(): string {
    return this.contentPageTitle$.value;
  }

  set contentPageTitle(title: string) {
    this.contentPageTitle$.next(title);
  }

  constructor() { }

  clearBreadcrumbValue() {
    this.path = '';
    this.contentPageTitle = '';
  }

}
