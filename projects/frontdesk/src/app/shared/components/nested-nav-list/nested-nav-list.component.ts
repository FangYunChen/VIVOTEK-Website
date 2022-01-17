import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatAccordionDisplayMode } from '@angular/material';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

export interface NestedNavListData {
  id: number;
  name: string;
  path?: string;
  active?: boolean;
  disabled?: boolean;
  children?: NestedNavListData[];
}

@Component({
  selector: 'vvtk-nested-nav-list',
  templateUrl: './nested-nav-list.component.html',
  styleUrls: ['./nested-nav-list.component.scss']
})
export class NestedNavListComponent implements OnInit, OnDestroy {

  @Input() displayMode: MatAccordionDisplayMode;
  @Input() hideToggle: boolean;
  @Input() collapsedHeight: string;
  @Input() expandedHeight: string;
  @Input() baseRouterLink: any[] = [];
  @Input()
  set data(value: NestedNavListData[]) {
    this._data = value;
    this.updateActiveStatus();
  }
  get data() {
    return this._data;
  }

  private _data: NestedNavListData[];
  private destroy$ = new Subject();

  constructor(
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateActiveStatus();
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackItem(index, item: NestedNavListData) {
    return item ? item.id : undefined;
  }

  private updateActiveStatus() {
    (this.data || []).forEach(item => {
      item.active = this.checkActive(this.router.url, this.baseRouterLink, item);
    });
  }

  private checkActive(
    currentUrl: string,
    baseRouterLink: any[],
    item: NestedNavListData
  ) {
    const link = `/${baseRouterLink.filter(x => !!x && x !== '/').join('/')}/${item.path}`;
    const arr = currentUrl.split(link);
    const isUrlStartWithLink = arr[0] === '';
    const isBasePath = !arr[1] || arr[1][0] === '/';
    return isUrlStartWithLink && isBasePath;
  }

}
