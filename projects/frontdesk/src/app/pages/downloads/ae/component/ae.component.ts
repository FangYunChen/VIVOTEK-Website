import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-ae',
  templateUrl: './ae.component.html',
  styleUrls: ['./ae.component.scss']
})
export class AEComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'A&E',
    filters: ['Model Name', 'Category'],
    documentTypeForData: ['A&E'],
    documentTypeForProperty: ['A&E']
  };

  constructor() { }

  ngOnInit() { }
}
