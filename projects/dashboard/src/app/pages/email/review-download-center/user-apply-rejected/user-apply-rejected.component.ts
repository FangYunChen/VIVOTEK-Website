import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-user-apply-rejected',
  templateUrl: './user-apply-rejected.component.html',
  styleUrls: ['./user-apply-rejected.component.scss']
})
export class UserApplyRejectedComponent implements OnInit {
  parameter: { key: string, value: string, preview: string }[];
  name: string;
  title: string;

  constructor() {
    this.name = 'download-center-user-apply-rejected';
    this.title = 'Download Cneter User Apply Rejected';
    this.parameter = [
      {
        key: 'page',
        value: 'Review page',
        preview: 'Download Center'
      },
      {
        key: 'note',
        value: 'Rejected reason',
        preview: 'Rejected reason'
      }
    ];
  }

  ngOnInit() { }
}
