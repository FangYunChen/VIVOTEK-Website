import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { CardsItemsNewsReleases } from '@frontdesk/core/classes';
import { Tag } from '@frontdesk/core/classes/news/tag';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-press-releases-tag',
  templateUrl: './press-releases-tag.component.html',
  styleUrls: ['./press-releases-tag.component.scss']
})
export class PressReleasesTagComponent implements OnInit {
  id: any;
  _tag: Tag;
  _data: CardsItemsNewsReleases[] = [];
  _cardsItems: CardsItemsNewsReleases[] = [];
  yearList: number[] = [];
  selectYear: number;

  routeParamsSub$: Subscription;
  tagSub$: Subscription;
  newsSub$: Subscription;

  constructor(
    private vvtkService: VvtkService,
    private route: ActivatedRoute
  ) {}

  setContent(Items: CardsItemsNewsReleases[]) {
    if (Items) {
      for (const item of Items) {
        item.publishAt = new Date(item.publishAt);
      }
      this._data = Items;
    }
  }

  ngOnInit() {
    this.routeParamsSub$ = this.route.params
      .pipe(
        catchError(error => {
          console.error('An error occurred', error);
          return of(error);
        }),
        finalize(() => {
          this.routeParamsSub$.unsubscribe();
        })
      )
      .subscribe(params => {
        this.id = params['id'] || this.route.snapshot.data['id'];
      });

    this.vvtkService.get(
      {
        path: `api/News/Tag/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            const data = resp.json();
            this._tag =
              data[this.vvtkService.nowLang] ||
              data[this.vvtkService.defaultLang];
          }
        }
      }
    );

    this.vvtkService.get(
      {
        path: 'api/News/List',
        disableLanguage: false,
        query: `data.sort=desc&data.order=publishAt&data.tag=${this.id}`
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: {
              filterTotal: number;
              list: CardsItemsNewsReleases[];
            } = resp.json();
            if (data.filterTotal > 0) {
              this.yearList = Array.from(
                new Set(
                  data.list.map(news => new Date(news.publishAt).getFullYear())
                )
              )
                .sort()
                .reverse();
              this.selectYear = this.yearList[0] || new Date().getFullYear();
              this.setContent(data.list);
              this.selectNewsByYear(null);
            }
          }
        }
      }
    );
  }

  selectNewsByYear(event: Event) {
    let year = '';
    if (event) {
      year = (event.target as HTMLSelectElement).value;
    }
    if (year === '') {
      this._cardsItems = this._data;
    } else {
      this._cardsItems = this._data.filter(
        item => item.publishAt.getFullYear().toString() === year
      );
    }
  }
}
