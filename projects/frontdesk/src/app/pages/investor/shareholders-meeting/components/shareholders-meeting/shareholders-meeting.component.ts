import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-shareholders-meeting',
  templateUrl: './shareholders-meeting.component.html',
  styleUrls: ['./shareholders-meeting.component.scss']
})
export class ShareholdersMeetingComponent implements OnInit {
  yearList$ = [];
  tabsActive: string;

  shardholderContents: {
    [year: number]: {
      title: string;
      content: string;
    }[];
  } = {};

  constructor(private vvtkService: VvtkService) {}

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Investors/Shareholder/Shareholder',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: {
              year: number;
              contents: {
                title: string;
                content: string;
              }[];
            }[] = resp.json();
            if (data.length > 0) {
              this.yearList$ = Array.from(
                new Set(data.map(element => element.year.toString()))
              );
              data.forEach(contents => {
                const year = contents.year;
                this.shardholderContents[year] = contents.contents;
              });
            }
            if (this.yearList$.length) {
              this.tabsActive = `year${
                this.yearList$[this.yearList$.length - 1]
              }`;
            }
          }
        }
      }
    );
  }

  tabsChange(tabsActive) {
    this.tabsActive = tabsActive;
  }
}
