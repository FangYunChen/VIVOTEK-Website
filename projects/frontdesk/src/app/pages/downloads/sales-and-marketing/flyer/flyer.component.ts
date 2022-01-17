import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-flyer',
  templateUrl: './flyer.component.html',
  styleUrls: ['./flyer.component.scss']
})
export class FlyerComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Flyer',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Sales & Marketing', 'Flyer'],
    documentTypeForProperty: ['Sales & Marketing', 'Flyer'],
    needLang: true
  };

  constructor() { }

  ngOnInit() { }
}
