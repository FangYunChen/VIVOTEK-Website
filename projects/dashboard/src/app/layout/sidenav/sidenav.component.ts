import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';
import { SidenavItem } from './sidenav-item/sidenav-item.model';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'vvtk-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnDestroy {
  items: SidenavItem[];

  private _itemsSubscription: Subscription;
  private _routerEventsSubscription: Subscription;

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._itemsSubscription = this.sidenavService.items$.subscribe(
      (items: SidenavItem[]) => {
        this.items = this.sortRecursive(items, 'position');
      }
    );

    this._routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.nextCurrentlyOpenByRoute(event.url.split('?')[0]);
      }
    });

    this.nextCurrentlyOpenByRoute(this.router.url.split('?')[0]);
  }

  nextCurrentlyOpenByRoute(url: string) {
    this.sidenavService.nextCurrentlyOpenByRoute(url);
    // setTimeout(() => {
    //   window.dispatchEvent(new Event('resize'));
    // }, 400);
  }

  toggleIconSidenav() {
    // setTimeout(() => {
    //   window.dispatchEvent(new Event('resize'));
    // }, 300);

    this.sidenavService.isIconSidenav = !this.sidenavService.isIconSidenav;

    const snackBarConfig: MatSnackBarConfig = <MatSnackBarConfig>{
      duration: 10000
    };

    if (this.sidenavService.isIconSidenav) {
      this.snackBar.open(
        'You activated Icon-Sidenav, move your mouse to the content and see what happens!',
        '',
        snackBarConfig
      );
    }
  }

  isIconSidenav(): boolean {
    return this.sidenavService.isIconSidenav;
  }

  sortRecursive(array: SidenavItem[], propertyName: string) {
    const that = this;

    array.forEach(function(item) {
      const keys = _.keys(item);
      keys.forEach(function(key) {
        if (_.isArray(item[key])) {
          item[key] = that.sortRecursive(item[key], propertyName);
        }
      });
    });

    return _.sortBy(array, propertyName);
  }

  ngOnDestroy() {
    if (this._itemsSubscription) {
      this._itemsSubscription.unsubscribe();
    }
    if (this._routerEventsSubscription) {
      this._routerEventsSubscription.unsubscribe();
    }
  }
}
