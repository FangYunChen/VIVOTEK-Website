import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-warranty-rma',
  templateUrl: './warranty-rma.component.html'
})
export class WarrantyRmaComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Support - Warranty & RMA',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Support/Warranty&RMA',
    apis: {
      get: 'api/Support/WarrantyRMA',
      patch: 'api/Support/WarrantyRMA'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
