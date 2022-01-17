import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Tutorials',
    filters: ['Title', 'Model Name'],
    documentTypeForData: ['Library', 'Tutorials'],
    documentTypeForProperty: ['Library', 'Tutorials'],
  };

  constructor() { }

  ngOnInit() { }
}
