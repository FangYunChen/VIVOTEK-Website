import { Component, OnInit, Input } from '@angular/core';
import { ProductInfo } from './product-info-model';

@Component({
  selector: 'vvtk-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  @Input()
  data: ProductInfo[];
  constructor() { }

  ngOnInit() {
  }

}
