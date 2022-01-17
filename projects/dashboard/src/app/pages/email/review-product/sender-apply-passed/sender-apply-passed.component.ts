import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-sender-apply-passed',
  templateUrl: './sender-apply-passed.component.html',
  styleUrls: ['./sender-apply-passed.component.scss']
})
export class SenderApplyPassedComponent implements OnInit {
  parameter: { key: string, value: string, preview: string }[];
  name: string;
  title: string;

  constructor() {
    this.name = 'product-sender-apply-passed';
    this.title = 'Product Sender Apply Passed';
    this.parameter = [
      {
        key: 'page',
        value: 'Review page',
        preview: 'Product'
      },
      {
        key: 'cms',
        value: 'Product List Position',
        preview: 'https://admin.vivotek.com/products/product'
      }
    ];
  }

  ngOnInit() { }
}
