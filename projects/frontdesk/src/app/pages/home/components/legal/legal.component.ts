import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
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
        path: 'api/Legal',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: {
              content: string;
              list: {
                title: string;
                content: string;
              }[];
            } = resp.json();
            if (data) {
              this._Content = data;
            }
          }
        }
      }
    );
  }
}
