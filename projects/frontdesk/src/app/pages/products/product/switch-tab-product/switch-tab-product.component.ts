import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductMainInfo } from '../../interfaces/product-main-info';
import { ProductTabInfo } from '../../interfaces/product-tab-info';

@Component({
  selector: 'vvtk-switch-tab-product',
  templateUrl: './switch-tab-product.component.html',
  styleUrls: ['./switch-tab-product.component.scss']
})
export class SwitchTabProductComponent implements OnInit {

  @Input() productMainInfo: ProductMainInfo;
  @Input()
  set productTabInfos(value: ProductTabInfo[]) {
    this._productTabInfos = value;
    this.updateTabIndex();
  }
  get productTabInfos() {
    return this._productTabInfos;
  }

  routerUrl: string;
  selectedTabIndex = 0;

  private _productTabInfos: ProductTabInfo[];
  private fragment;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      this.updateTabIndex();
    });
  }

  ngOnInit() {
    this.routerUrl = this.router.url.split('#')[0];
  }

  private updateTabIndex() {
    (this.productTabInfos || []).forEach((tab, index) => {
      if (tab.anchorUrl === this.fragment) {
        this.selectedTabIndex = index;
      }
    });
  }

}
