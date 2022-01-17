import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-sender-apply-rejected',
  templateUrl: './sender-apply-rejected.component.html',
  styleUrls: ['./sender-apply-rejected.component.scss']
})
export class SenderApplyRejectedComponent implements OnInit {
  parameter: { key: string, value: string, preview: string }[];
  name: string;
  title: string;

  constructor() {
    this.name = 'product-sender-apply-rejected';
    this.title = 'Product Sender Apply Rejected';
    this.parameter = [
      {
        key: 'page',
        value: 'Review page',
        preview: 'Product'
      },
      {
        key: 'note',
        value: 'Rejected reason',
        preview: 'Rejected reason'
      },
      {
        key: 'reviewer',
        value: 'Reviewer email',
        preview: 'reviewer@vivotek.com'
      },
      {
        key: 'cms',
        value: 'Product List Position',
        preview: 'https://admin.vivotek.com/products/product'
      },
    ];
  }

  ngOnInit() { }
}
