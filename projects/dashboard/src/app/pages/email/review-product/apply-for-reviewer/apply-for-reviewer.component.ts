import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-apply-for-reviewer',
  templateUrl: './apply-for-reviewer.component.html',
  styleUrls: ['./apply-for-reviewer.component.scss']
})
export class ApplyForReviewerComponent implements OnInit {
  parameter: { key: string, value: string, preview: string }[];
  name: string;
  title: string;

  constructor() {
    this.name = 'product-apply-for-reviewer';
    this.title = 'Product Apply For Reviewer';
    this.parameter = [
      {
        key: 'page',
        value: 'Review page',
        preview: 'Product'
      },
      {
        key: 'productName',
        value: 'Product name',
        preview: 'CC8888'
      },
      {
        key: 'note',
        value: 'Review note',
        preview: 'Review note'
      },
      {
        key: 'cms',
        value: 'Review Product List Position',
        preview: 'https://admin.vivotek.com/products/review/product'
      }
    ];
  }

  ngOnInit() { }
}
