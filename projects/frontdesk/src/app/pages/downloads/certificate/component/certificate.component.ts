import { Component, OnInit } from '@angular/core';
import { GeneralDownloadOption } from '@frontdesk/core/interfaces/download-center';

@Component({
  selector: 'vvtk-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  option: GeneralDownloadOption = {
    title: 'Certificate',
    filters: ['Model Name', 'Category'],
    documentTypeForData: ['Certificate'],
    documentTypeForProperty: ['Certificate']
  };

  constructor() { }

  ngOnInit() { }
}
