import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services';
import { Coverage } from '@frontdesk/core/interfaces/news-coverage';

@Component({
  selector: 'vvtk-industry-coverage',
  templateUrl: './industry-coverage.component.html',
  styleUrls: ['./industry-coverage.component.scss']
})
export class IndustryCoverageComponent implements OnInit {
  items: Coverage[] = [];
  years: number[];
  selectedYear: number;
  query = {
    year: '',
    filter: '',
    sort: 'desc',
    order: 'publishAt',
    pageIndex: 0,
    start: 0,
    limit: 1000
  };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.getCoverageYears();
  }

  getCoverageYears() {
    this.vvtkApiService.get({
      path: `api/Coverage/Years`,
      disableLanguage: true
    }).subscribe(
      data => {
        this.years = data || [];
        this.years.reverse();
        this.selectedYear = this.years[0] || 0;
        this.query.year = this.selectedYear.toString();
        this.getData();
      }
    );
  }

  getData() {
    this.vvtkApiService.get({
      path: `api/Coverage/List`,
      query: this.serialize(this.query)
    }).subscribe(
      data => {
        this.items = data.list;
      }
    );
  }

  selectYear() {
    this.setQuery({
      year: this.selectedYear,
      pageIndex: 0
    });
  }

  setQuery(obj: object) {
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        this.query[p] = obj[p];
      }
    }
    this.getData();
  }

  private serialize(obj: object) {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p) && encodeURIComponent(obj[p])) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }

  discriptionClip(text: string) {
    if (text && text.length > 240) {
      text = text.substr(0, 236) + '...';
    }
    return text;
  }
}
