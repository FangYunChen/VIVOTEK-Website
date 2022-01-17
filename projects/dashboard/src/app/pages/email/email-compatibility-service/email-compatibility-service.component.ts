import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-email-compatibility-service',
  templateUrl: './email-compatibility-service.component.html',
  styleUrls: ['./email-compatibility-service.component.scss']
})
export class EmailCompatibilityServiceComponent implements OnInit {
  parameter: { key: string, value: string, preview: string }[];
  name: string;
  title: string;

  constructor() {
    this.name = 'compatibility-service';
    this.title = 'Compatibility Suggestion For Service';
    this.parameter = [
      {
        key: 'id',
        value: 'Request code',
        preview: '5'
      },
      {
        key: 'email',
        value: 'PP/PM email',
        preview: 'demo@vivotek.com'
      },
      {
        key: 'sender',
        value: 'Sender email',
        preview: 'demo@gmail.com'
      },
      {
        key: 'cms',
        value: 'CMS Position',
        preview: 'https://admin.vivotek.com/supports/compatibility/suggestion-list'
      }
    ];
  }

  ngOnInit() {
  }
}
