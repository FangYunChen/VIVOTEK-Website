import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-investor-conference',
  templateUrl: './investor-conference.component.html',
  styleUrls: ['./investor-conference.component.scss']
})
export class InvestorConferenceComponent implements OnInit {
  presentationContent = '';
  presentationLinks: {
    year: number;
    links: {
      title: string;
      url: string;
    }[];
  }[] = [];

  yearList$: number[] = [];
  tabsActive: string;

  constructor(private vvtkService: VvtkService) {}

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Investors/Presentation',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: {
              content: string;
              list: {
                year: number;
                links: {
                  title: string;
                  url: string;
                }[];
              }[];
            } = resp.json();
            if (data.content) {
              this.presentationContent = data.content;
            }
            if (data.list) {
              this.presentationLinks = data.list;
              this.yearList$ = Array.from(
                new Set(
                  this.presentationLinks.map(element => element.year).sort()
                )
              );
              this.presentationLinks.forEach(links => {
                links.links = links.links.filter(
                  link => link.url !== '' && link.title !== ''
                );
              });
              this.presentationLinks = this.presentationLinks.filter(
                list => list.links.length > 0
              );
            }
            if (this.yearList$.length > 0) {
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
