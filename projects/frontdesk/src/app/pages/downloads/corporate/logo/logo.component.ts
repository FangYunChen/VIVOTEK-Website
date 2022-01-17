import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'LOGO',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Corporate', 'LOGO'],
    documentTypeForProperty: ['Corporate', 'LOGO']
  };

  constructor() { }

  ngOnInit() { }
}
