import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  _Content: {
    content: string;
    list: {
      title: string;
      content: string;
    }[];
  } = {
    content: '',
    list: []
  };

  constructor(private vvtkService: VvtkService) {}

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/PrivacyPolicy',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data = resp.json();
            if (data) {
              this._Content = data;
            }
          }
        }
      }
    );
  }
}
