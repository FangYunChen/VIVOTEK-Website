import { Component, OnInit, Input } from '@angular/core';

import { ProductMainInfo } from '../../interfaces/product-main-info';
import { StateEnum } from '@frontdesk/core/constants/product-constant';

@Component({
  selector: 'vvtk-product-main-info',
  templateUrl: './product-main-info.component.html',
  styleUrls: ['./product-main-info.component.scss']
})
export class ProductMainInfoComponent implements OnInit {

  @Input()
  set data(value: ProductMainInfo) {
    this._data = value;
    this.seriesImageUrl = value && value.series
      ? `/assets/img/series/icon_series-${value.series.toLowerCase()}.png`
      : null;
    this.images = value
      ? value.images.map(x => x.imagePath)
      : null;
  }
  get data() {
    return this._data;
  }

  stateEnum = StateEnum;
  images: string[] = [];
  seriesImageUrl: string;

  private _data: ProductMainInfo;

  constructor() { }

  ngOnInit() {
  }

}
