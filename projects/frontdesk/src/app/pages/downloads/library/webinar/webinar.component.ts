import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.scss']
})
export class WebinarComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Webinar',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Library', 'Webinar'],
    documentTypeForProperty: ['Library', 'Webinar'],
    needLang: true
  };

  constructor() { }

  ngOnInit() { }
}
