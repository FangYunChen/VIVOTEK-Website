import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { AboutCSRCategory } from '../../../../../vvtk-core/classes/aboutCSR';

@Component({
  selector: 'vvtk-about-csr-category-content',
  templateUrl: './about-csr-category-content.component.html',
  styleUrls: ['./about-csr-category-content.component.scss']
})
export class AboutCSRCategoryContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  id: number;
  data: AboutCSRCategory;
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
        path: `api/CSR/Category/${this.id}`
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
          path: `api/CSR/Category`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/csr/categories/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/CSR/Category/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/csr/categories/list']);
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
