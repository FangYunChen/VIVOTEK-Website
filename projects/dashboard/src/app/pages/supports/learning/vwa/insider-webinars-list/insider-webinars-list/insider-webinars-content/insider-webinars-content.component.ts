import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';
import { WebinarsSeries, WebinarsLanguage, InsiderWebinars } from 'projects/dashboard/src/app/vvtk-core/classes/insider-webinars';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vvtk-insider-webinars-content',
  templateUrl: './insider-webinars-content.component.html'
})
export class InsiderWebinarsContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: number;
  webinars: InsiderWebinars;
  path = 'VIVOCloudSupportModel';
  series: WebinarsSeries[] = [];
  language: WebinarsLanguage[] = [];
  selectedLanguage$: Subscription;
  selectedLanguage: string;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.webinars = {
      id: 0,
      lang: '',
      displayouder: 0,
      date: '',
      time: '',
      title: '',
      series: 0,
      language: 0,
      register: '',
      image: '',
      watch: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getSeriesOptions();
    this.getLanguageOptions();
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.getInsiderWebinars();
      }
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        if (this.webinars.id !== 0) {
          this.getInsiderWebinars();
        }
      }
    );
  }

  getInsiderWebinars() {
    this.vvtkService.get(
      {
        path: `api/Supports/Learning/InsiderWebinars/List/${this.id}`,
        disableLanguage: false
      },
      {
        next: resp => {
          const body = resp.json();
          this.webinars = body;
        }
      }
    );
  }

  getSeriesOptions() {
    this.vvtkService.get(
      {
        path: `api/Supports/Learning/InsiderWebinars/List/Filter/Series`,
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

  getLanguageOptions() {
    this.vvtkService.get(
      {
        path: `api/Supports/Learning/InsiderWebinars/List/Filter/Language`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.language = body;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Supports/Learning/InsiderWebinars/List/Add`,
          disableLanguage: false
        },
        this.webinars,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/vwa/insider-webinars-list/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Supports/Learning/InsiderWebinars/List/${this.id}`,
          disableLanguage: false
        },
        this.webinars,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/vwa/insider-webinars-list/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
