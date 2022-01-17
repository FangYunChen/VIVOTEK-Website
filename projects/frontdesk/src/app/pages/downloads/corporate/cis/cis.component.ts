import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-cis',
  templateUrl: './cis.component.html',
  styleUrls: ['./cis.component.scss']
})
export class CisComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'CIS',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Corporate', 'CIS'],
    documentTypeForProperty: ['Corporate', 'CIS']
  };

  constructor() { }

  ngOnInit() { }
}
