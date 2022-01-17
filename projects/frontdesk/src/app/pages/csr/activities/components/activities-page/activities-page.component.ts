import { Component, OnInit } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { Collection } from '@frontdesk/core/collection.enum';
import { ActivatedRoute } from '@angular/router';
import { VvtkService } from '@frontdesk/core/services';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss']
})
export class ActivitiesPageComponent implements OnInit {
  id;
  pageContent: {
    content: string;
    date: string;
    image: {
      src: string;
      alt: string;
      title: string;
    };
    title: string;
    description: string;
    status: number;
  } = {
    content: '',
    date: '',
    image: {
      src: '',
      alt: '',
      title: ''
    },
    title: '',
    description: '',
    status: 0
  };
  routeParamsSub$: Subscription;

  public collection = Collection;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService
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
        path: `api/CSRActivity/${this.id}`,
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data = resp.json();
            if (data) {
              this.pageContent = data;
            }
          }
        }
      }
    );

    setTimeout(() => {
      $('figcaption').each(function() {
        const imgWidth = $(this)
          .find('img')
          .width();
        $(this)
          .find('figure')
          .width(imgWidth);
      });
    }, 1);
  }
}
