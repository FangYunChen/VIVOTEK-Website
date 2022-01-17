import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-apply-for-user',
  templateUrl: './apply-for-user.component.html',
  styleUrls: ['./apply-for-user.component.scss']
})
export class ApplyForUserComponent implements OnInit {
  parameter: { key: string, value: string, preview: string }[];
  name: string;
  title: string;

  constructor() {
    this.name = 'download-center-apply-for-user';
    this.title = 'Download Cneter Apply For User';
    this.parameter = [
      {
        key: 'email',
        value: 'User email',
        preview: 'demo@gmail.com'
      }
    ];
  }

  ngOnInit() { }
}
