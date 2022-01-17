import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-user-apply-passed',
  templateUrl: './user-apply-passed.component.html',
  styleUrls: ['./user-apply-passed.component.scss']
})
export class UserApplyPassedComponent implements OnInit {
  parameter: { key: string, value: string, preview: string }[];
  name: string;
  title: string;

  constructor() {
    this.name = 'download-center-user-apply-passed';
    this.title = 'Download Cneter User Apply Passed';
    this.parameter = [
      {
        key: 'page',
        value: 'Review page',
        preview: 'Download Center'
      },
      {
        key: 'applicationPage',
        value: 'Application Passed Page',
        preview: 'https://www.vivotek.com/downloads/sdk'
      }
    ];
  }

  ngOnInit() { }
}
