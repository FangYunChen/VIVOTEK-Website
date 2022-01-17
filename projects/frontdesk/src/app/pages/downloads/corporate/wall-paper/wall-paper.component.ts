import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-wall-paper',
  templateUrl: './wall-paper.component.html',
  styleUrls: ['./wall-paper.component.scss']
})
export class WallPaperComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Wall Paper',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Corporate', 'Wall Paper'],
    documentTypeForProperty: ['Corporate', 'Wall Paper']
  };

  constructor() { }

  ngOnInit() { }
}
