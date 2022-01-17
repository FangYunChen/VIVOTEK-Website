import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { WebinarsSeries, WebinarsLanguage, InsiderWebinars } from 'projects/dashboard/src/app/vvtk-core/classes/insider-webinars';
import { convertToYoutubeEmbedUrl } from '@frontdesk/core/utils/youtube-url-convert-utils';

@Component({
  selector: 'vvtk-insider-webinars',
  templateUrl: './insider-webinars.component.html',
  styleUrls: ['./insider-webinars.component.scss']
})
export class InsiderWebinarsComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };
  series: WebinarsSeries[] = [];
  serie?: number = null;
  date?: string = null;
  languages: WebinarsLanguage[] = [];
  language?: number = null;
  webinars: InsiderWebinars[] = [];
  webinarsfilter: InsiderWebinars[] = [];
  webinarsOndemandfilter: InsiderWebinars[] = [];
  openPopup = false;
  videoUrl = '';

  constructor(private vvtkApiService: VvtkApiService, private vvtkService: VvtkService, private route: Router) { }

  ngOnInit() {
    this.getFilter();
    this.getData();
    this.vvtkApiService.get({
      path: 'api/Supports/Learning/InsiderWebinars'
    }).subscribe(result => this._Content = result || this._Content);
  }

  getFilter() {
    this.vvtkService.get(
      {
        path: `api/Supports/Learning/InsiderWebinars/List/Series/ManageList`,
        disableLanguage: true
      },
      {
        next: resp => {
          this.series.push({ id: null, seriesName: 'Filter by series' });
          const filterList = resp.json().map(f => ({ id: f.id, seriesName: f.seriesName }));
          this.series = this.series.concat(filterList);
        }
      }
    );
    this.vvtkService.get(
      {
        path: `api/Supports/Learning/InsiderWebinars/List/Language/ManageList`,
        disableLanguage: true
      },
      {
        next: resp => {
          this.languages.push({ id: null, languageName: 'Language' });
          const filterList = resp.json().map(f => ({ id: f.id, languageName: f.languageName }));
          this.languages = this.languages.concat(filterList);
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Supports/Learning/InsiderWebinars/List/ALL`,
        disableLanguage: true
      },
      {
        next: resp => {
          this.webinars = resp.json();
          this.webinarsfilter = resp.json();
          this.webinarsOndemandfilter = this.webinars.filter(f => f.watch);
        }
      }
    );
  }

  filterInsiderWebinars() {
    this.webinarsfilter = this.webinars.filter(f =>
      (!this.language || f.language === this.language)
      && (!this.serie || f.series === this.serie)
      && (!this.date || f.date === this.date));
    this.webinarsOndemandfilter = this.webinarsfilter.filter(f => f.watch);
  }
  resetFilter() {
    this.language = null;
    this.serie = null;
    this.date = null;
    this.filterInsiderWebinars();
  }

  openVideo(watch: string) {
    if (!watch) {
      return;
    }
    this.videoUrl = convertToYoutubeEmbedUrl(watch);
    this.openPopup = true;
  }

  windowPopup(isPopup: boolean) {
    this.openPopup = isPopup;
  }
}

