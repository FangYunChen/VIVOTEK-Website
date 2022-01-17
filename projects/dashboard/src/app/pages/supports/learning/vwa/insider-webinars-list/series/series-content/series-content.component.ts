import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportType } from '../../../../../../../vvtk-core/classes/product-vivocloud';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';
import { WebinarsSeries } from 'projects/dashboard/src/app/vvtk-core/classes/insider-webinars';

@Component({
  selector: 'vvtk-series-content',
  templateUrl: './series-content.component.html',
  styleUrls: ['./series-content.component.scss']
})

export class SeriesContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: number;
  series: WebinarsSeries;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.series = {
      id: 0,
      seriesName: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.getModelType();
      }
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getModelType() {
    this.vvtkService.get(
      {
        path: `api/Supports/Learning/InsiderWebinars/List/Series/${this.id}`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.series = body;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Supports/Learning/InsiderWebinars/List/Series`,
          disableLanguage: true
        },
        this.series,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/vwa/insider-webinars-list/series']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Supports/Learning/InsiderWebinars/List/Series/${this.id}`,
          disableLanguage: true
        },
        this.series,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/vwa/insider-webinars-list/series']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
