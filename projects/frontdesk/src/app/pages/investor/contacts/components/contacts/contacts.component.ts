import { Component, OnInit } from '@angular/core';

import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  shareholdingTemplate: string;

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Investors/Shareholder/Shareholding',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: {
              templates: string;
            } = resp.json();
            if (data && data.templates) {
              this.shareholdingTemplate = data.templates;
            }
          }
        }
      }
    );
  }
}
