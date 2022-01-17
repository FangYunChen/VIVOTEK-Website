import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { AboutGreenCategory } from '../../../../../vvtk-core/classes/aboutGreen';

@Component({
  selector: 'vvtk-about-green-category-content',
  templateUrl: './about-green-category-content.component.html',
  styleUrls: ['./about-green-category-content.component.scss']
})
export class AboutGreenCategoryContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  id: number;
  data: AboutGreenCategory;
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
        path: `api/GreenVivotek/Category/${this.id}`
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
          path: `api/GreenVivotek/Category`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/green/categories/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/GreenVivotek/Category/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/green/categories/list']);
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
