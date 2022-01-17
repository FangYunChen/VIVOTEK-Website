import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-anpr-package',
  templateUrl: './anpr-package.component.html',
  styleUrls: ['./anpr-package.component.scss']
})
export class AnprComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'ANPR Package',
    filters: ['Model Name', 'Category'],
    documentTypeForData: ['ANPR Package'],
    documentTypeForProperty: ['ANPR Package']
  };

  constructor() { }

  ngOnInit() { }
}
