import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-sdk',
  templateUrl: './sdk.component.html',
  styleUrls: ['./sdk.component.scss']
})
export class SdkComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'SDK',
    filters: ['Model Name', 'Category'],
    documentTypeForData: ['SDK'],
    documentTypeForProperty: ['SDK']
  };

  constructor() { }

  ngOnInit() { }
}
