import { InvestorsServiceCategory } from './../../../../../vvtk-core/classes/investorsService';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';

@Component({
  selector: 'vvtk-investors-service-category-content',
  templateUrl: './investors-service-category-content.component.html',
  styleUrls: ['./investors-service-category-content.component.scss']
})
export class InvestorsServiceCategoryContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  id: number;
  data: InvestorsServiceCategory;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.data = {
      name: '',
      displayOrder: 0
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSelectedLanguage();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Investors/Category/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();
          this.data = body;
        }
      }
    );
  }

  save() {
    this.isLoading = true;

    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Investors/Category`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/investors/service/categories/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Investors/Category/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/investors/service/categories/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
