import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-white-paper',
  templateUrl: './white-paper.component.html',
  styleUrls: ['./white-paper.component.scss']
})
export class WhitePaperComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'White Paper',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Library', 'White Paper'],
    documentTypeForProperty: ['Library', 'White Paper'],
    needLang: true
  };

  constructor() { }

  ngOnInit() { }
}
