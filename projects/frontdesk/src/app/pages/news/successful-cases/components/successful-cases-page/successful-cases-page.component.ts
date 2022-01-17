import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { Collection } from '../../../../../vvtk-core/collection.enum';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMetaService } from '../../../../../vvtk-core/services';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-successful-cases-page',
  templateUrl: './successful-cases-page.component.html',
  styleUrls: ['./successful-cases-page.component.scss']
})
export class SuccessfulCasesPageComponent implements OnInit {
  id: any;

  routeParamsSub$: Subscription;
  _Content;

  public collection = Collection;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService,
    private route: ActivatedRoute,
    private router: Router,
    private pageMetaService: PageMetaService
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
        this.id = params['id'] || this.route.snapshot.data['id'];
      });

    this.vvtkService.get(
      {
        path: `api/Case/${this.id}`,
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data = resp.json();
            if (data) {
              if (data.status !== 1) {
                this.router.navigate([
                  this.pageMetaService.getCustomPath('/404')
                ]);
              }
              this._Content = data;
            }
          }
        },
        error: error => {
          console.error('An error occurred in getNewsPage & NewsCases', error);
          // TODO: 要做 跳到 找不到這個頁面 之後跳回第一頁新聞列表的功能
        }
      }
    );
  }
}
