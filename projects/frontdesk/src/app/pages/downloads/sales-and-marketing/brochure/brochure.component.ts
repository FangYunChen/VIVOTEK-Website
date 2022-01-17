import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-brochure',
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.scss']
})
export class BrochureComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Product Brochure',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Sales & Marketing', 'Brochure'],
    documentTypeForProperty: ['Sales & Marketing', 'Brochure'],
    needLang: true
  };

  constructor() { }

  ngOnInit() { }
}
