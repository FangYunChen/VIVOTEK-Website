import { Injectable } from '@angular/core';
import { Page, PageSetting } from '../../vvtk-core/classes/page';

@Injectable()
export class PageService {

    _pageSetting: PageSetting;
    _pages: Page[];

    constructor() { }

    set pageSetting(val: PageSetting) {
        this._pageSetting = val;
    }
    get pageSetting(): PageSetting {
        return this._pageSetting;
    }

    set pages(val: Page[]) {
        this._pages = val;
    }
    get pages(): Page[] {
        return this._pages;
    }

}
