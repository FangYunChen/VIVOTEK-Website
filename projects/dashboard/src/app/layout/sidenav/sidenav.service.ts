import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService, SysModuleViewModel } from '../../vvtk-core/services/auth.service';
import { SharedService } from '../../vvtk-core/services/shared.service';
import { SidenavItem } from './sidenav-item/sidenav-item.model';

@Injectable()
export class SidenavService {
  private _itemsSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _items: SidenavItem[] = [];
  get items$(): Observable<SidenavItem[]> {
    if (this._items.length === 0) {
      const userData = this.authService.userData;
      if (userData && userData['modules']) {
        for (const module of userData.modules) {
          if (
            (module.route || module.childModules.length > 0) &&
            module.isVisible &&
            environment.authGuardModuleTypes.indexOf(module.type) > -1
          ) {
            // 假如 module 沒有路徑，下層也沒有子模組，是一個空的目錄就不要放到 Menu 裡面
            // 否則 click 時會出錯，交由前端處理
            const item = this.addItem(module.id, module.name, module.icon, module.route, module.position);
            if (module.childModules.length > 0) {
              this.addSubItemFromApi(item, module.childModules);
            }
          }
        }
      }
    }
    return this._itemsSubject.asObservable();
  }

  private _currentlyOpenSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _currentlyOpen: SidenavItem[] = [];
  currentlyOpen$: Observable<SidenavItem[]> = this._currentlyOpenSubject.asObservable();

  isIconSidenav: boolean;

  constructor(snackbar: MatSnackBar, private authService: AuthService, private sharedService: SharedService) {}

  addItem(
    id: number,
    name: string,
    icon: string,
    route: any,
    position: number,
    badge?: string,
    badgeColor?: string,
    customClass?: string
  ) {
    const item = new SidenavItem({
      id: id,
      name: name,
      icon: icon,
      route: route,
      subItems: [],
      subHideItems: [],
      position: position || 99,
      badge: badge || null,
      badgeColor: badgeColor || null,
      customClass: customClass || null
    });

    this._items.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  addSubItem(parent: SidenavItem, id: number, name: string, route: any, position: number) {
    const item = new SidenavItem({
      id: id,
      name: name,
      route: route,
      parent: parent,
      subItems: [],
      subHideItems: [],
      position: position || 99
    });

    parent.subItems.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  addSubHideItems(parent: SidenavItem, id: number, name: string, route: any, position: number) {
    const item = new SidenavItem({
      id: id,
      name: name,
      route: route,
      parent: parent,
      subItems: [],
      subHideItems: [],
      position: position || 99
    });

    parent.subHideItems.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  addSubItemFromApi(item: SidenavItem, modules: SysModuleViewModel[]) {
    for (const module of modules) {
      let subitem;
      if (
        (module.route || module.childModules.length > 0) &&
        environment.authGuardModuleTypes.indexOf(module.type) > -1
      ) {
        if (module.isVisible) {
          subitem = this.addSubItem(item, module.id, module.name, module.route, module.position);
        } else {
          subitem = this.addSubHideItems(item, module.id, module.name, module.route, module.position);
        }
        this.addSubItemFromApi(subitem, module.childModules);
      }
    }
  }

  removeItem(item: SidenavItem) {
    const index = this._items.indexOf(item);
    if (index > -1) {
      this._items.splice(index, 1);
    }

    this._itemsSubject.next(this._items);
  }

  isOpen(item: SidenavItem) {
    return this._currentlyOpen.indexOf(item) !== -1;
  }

  toggleCurrentlyOpen(item: SidenavItem) {
    let currentlyOpen = this._currentlyOpen;

    if (this.isOpen(item)) {
      if (currentlyOpen.length > 1) {
        currentlyOpen.length = this._currentlyOpen.indexOf(item);
      } else {
        currentlyOpen = [];
      }
    } else {
      currentlyOpen = this.getAllParents(item);
    }

    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  getAllParents(item: SidenavItem, currentlyOpen: SidenavItem[] = []) {
    currentlyOpen.unshift(item);

    if (item.hasParent()) {
      return this.getAllParents(item.parent, currentlyOpen);
    } else {
      return currentlyOpen;
    }
  }

  nextCurrentlyOpen(currentlyOpen: SidenavItem[]) {
    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  nextCurrentlyOpenByRoute(route: string) {
    let currentlyOpen = [];

    const item = this.findByRouteRecursive(route, this._items);

    if (item && item.hasParent()) {
      currentlyOpen = this.getAllParents(item);
    } else if (item) {
      currentlyOpen = [item];
    }

    this.nextCurrentlyOpen(currentlyOpen);
  }

  findByRouteRecursive(route: string, collection: SidenavItem[]) {
    let result = _.find(collection, item => {
      return new RegExp(`^${item.route}$`, 'i').test(route);
    });

    if (!result) {
      _.each(collection, item => {
        if (item.hasSubItems()) {
          const found = this.findByRouteRecursive(route, item.subItems);

          if (found) {
            result = found;
            return false;
          }
        }
        if (item.hasSubHideItems()) {
          const found = this.findByRouteRecursive(route, item.subHideItems);

          if (found) {
            result = found;
            return false;
          }
        }
      });
    } else {
      this.sharedService.setPageModuleId(result.id);
    }

    return result;
  }

  get currentlyOpen() {
    return this._currentlyOpen;
  }

  getSidenavItemByRoute(route) {
    return this.findByRouteRecursive(route, this._items);
  }
}
