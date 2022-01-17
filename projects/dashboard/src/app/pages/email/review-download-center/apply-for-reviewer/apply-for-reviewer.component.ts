import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-apply-for-reviewer',
  templateUrl: './apply-for-reviewer.component.html',
  styleUrls: ['./apply-for-reviewer.component.scss']
})
export class ApplyForReviewerComponent implements OnInit {
  parameter: { key: string, value: string, preview: string }[];
  name: string;
  title: string;

  constructor() {
    this.name = 'download-center-apply-for-reviewer';
    this.title = 'Download Cneter Apply For Reviewer';
    this.parameter = [
      {
        key: 'documentTypeName',
        value: 'Download Center Document Type',
        preview: 'SDK'
      },
      {
        key: 'email',
        value: 'Reviewer email',
        preview: 'manager@vivotek.com'
      },
      {
        key: 'sender',
        value: 'Sender email',
        preview: 'demo@gmail.com'
      },
      {
        key: 'cms',
        value: 'CMS Position',
        preview: 'https://admin.vivotek.com/download-center/review-user-permission'
      },
      {
        key: 'fName',
        value: 'First Name',
        preview: 'Lee'
      },
      {
        key: 'lName',
        value: 'Last Name',
        preview: 'Stacy'
      },
      {
        key: 'company',
        value: 'Company',
        preview: 'Vivotek'
      },
      {
        key: 'website',
        value: 'Website',
        preview: 'www.vivotek.com'
      },
      {
        key: 'country',
        value: 'Country',
        preview: 'Taiwan'
      },
      {
        key: 'applications',
        value: 'Target applications to be working with VIVOTEK products',
        preview: 'App'
      },
      {
        key: 'devices',
        value: 'Any projects ongoing / anticipated volume using VIVOTEK devices',
        preview: 'Phone'
      },
      {
        key: 'cameraModel',
        value: 'cameraModel',
        preview: 'Model'
      },
      {
        key: 'distributorChannel',
        value: 'distributorChannel',
        preview: 'Channel'
      },
      {
        key: 'cameraMAC',
        value: 'cameraMAC',
        preview: 'MAC'
      },
      {
        key: 'useCases',
        value: 'useCases',
        preview: 'Cases'
      },
      {
        key: 'purchase',
        value: 'Purchase',
        preview: 'Purchase'
      },
      {
        key: 'macAddress',
        value: 'MACAddress',
        preview: 'MACAddress'
      },
      {
        key: 'countingUseCase',
        value: 'CountingUseCase',
        preview: 'CountingUseCase'
      }
    ];
  }

  ngOnInit() { }
}
