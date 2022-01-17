import { Component, OnInit } from '@angular/core';
import { ProductCard } from '../../../../../../vvtk-core/interface/product';

@Component({
  selector: 'vvtk-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {

  pageIsEditable = false;
  relatedProducts: ProductCard[] = [];

  constructor() { }

  ngOnInit() { }

}
