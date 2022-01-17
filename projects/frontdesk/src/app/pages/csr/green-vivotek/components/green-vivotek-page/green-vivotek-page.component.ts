import { Component, OnInit } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VvtkService } from '@frontdesk/core/services';
import { GreenVivotekService } from '../../green-vivotek.service';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-green-vivotek-page',
  templateUrl: './green-vivotek-page.component.html',
  styleUrls: ['./green-vivotek-page.component.scss']
})
export class GreenVivotekPageComponent implements OnInit {
  pageId: number;

  page: {
    id: number;
    categoryId: number;
    title: string;
    content: string;
    templates: string[];
  } = {
    id: 0,
    categoryId: 0,
    title: '',
    content: '',
    templates: []
  };

  routeParamsSub$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private greenVivotekService: GreenVivotekService
  ) {}

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
        this.pageId = params['id'] || this.route.snapshot.data['id'];
        if (this.pageId) {
          this.greenVivotekService.setPageId(this.pageId);
          this.vvtkService.get(
            {
              path: `api/GreenVivotek/Page/${this.pageId}`,
              disableLanguage: false
            },
            {
              next: resp => {
                this.page = resp.json();
                this.greenVivotekService.setPageTitle(this.page.title);
              }
            }
          );
        }
      });
  }
}
