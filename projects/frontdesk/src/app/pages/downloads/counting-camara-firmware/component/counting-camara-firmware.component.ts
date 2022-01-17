import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-counting-camara-firmware',
  templateUrl: './counting-camara-firmware.component.html',
  styleUrls: ['./counting-camara-firmware.component.scss']
})
export class CountingCamaraComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Counting Camera Firmware',
    filters: ['Model Name', 'Category'],
    documentTypeForData: ['Counting FW'],
    documentTypeForProperty: ['Counting FW']
  };

  constructor() { }

  ngOnInit() { }
}
