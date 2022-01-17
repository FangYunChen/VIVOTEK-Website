import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {
  _Content: {
    content: string;
    list: {
      title: string;
      content: string;
    }[]
  } = {
    content: '',
    list: []
  };

  constructor(
    private vvtkService: VvtkService) {
  }

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/TermsOfUse',
        disableLanguage: false
      }, {
        next: (resp) => {
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
