import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'E-Commerce',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/LandingPages/ECommerce',
    apis: {
      get: 'api/LandingPages/ECommerce',
      patch: 'api/LandingPages/ECommerce'
    }
  };

  constructor() {}

  ngOnInit() {}
}
