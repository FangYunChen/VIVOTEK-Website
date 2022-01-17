import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vvtk-product-model-special-highlight',
  templateUrl: './product-model-special-highlight.component.html',
  styleUrls: ['./product-model-special-highlight.component.scss']
})
export class ProductModelSpecialHighlightComponent implements OnInit {

  @Input() template;

  constructor() { }

  ngOnInit() {
  }

}
