import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-dividend-history',
  templateUrl: './dividend-history.component.html',
  styleUrls: ['./dividend-history.component.scss']
})
export class DividendHistoryComponent implements OnInit {
  dividendContent: string;
  dividendSheet: any = {
    title: ''
  };

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Investors/Shareholder/Dividend',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: {
              content: string;
              sheet: string;
            } = resp.json();
            if (data && data.content) {
              this.dividendContent = data.content;
            }
            if (data && data.sheet) {
              this.dividendSheet = JSON.parse(data.sheet);
            }
          }
        }
      }
    );
  }
}
