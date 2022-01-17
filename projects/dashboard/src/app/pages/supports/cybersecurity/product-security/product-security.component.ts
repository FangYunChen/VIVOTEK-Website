import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-product-security',
  templateUrl: './product-security.component.html'
})
export class ProductSecurityComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Support - Product Security',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/ProductSecurity',
    apis: {
      get: 'api/Supports/ProductSecurity',
      patch: 'api/Supports/ProductSecurity'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
