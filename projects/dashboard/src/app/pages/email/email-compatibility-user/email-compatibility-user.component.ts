import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-email-compatibility-user',
  templateUrl: './email-compatibility-user.component.html',
  styleUrls: ['./email-compatibility-user.component.scss']
})
export class EmailCompatibilityUserComponent implements OnInit {
  parameter: { key: string, value: string, preview: string }[];
  name: string;
  title: string;

  constructor() {
    this.name = 'compatibility-user';
    this.title = 'Compatibility Suggestion For User';
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
