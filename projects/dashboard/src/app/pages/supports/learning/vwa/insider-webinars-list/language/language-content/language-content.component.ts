import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportType } from '../../../../../../../vvtk-core/classes/product-vivocloud';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';
import { WebinarsLanguage } from 'projects/dashboard/src/app/vvtk-core/classes/insider-webinars';

@Component({
  selector: 'vvtk-language-content',
  templateUrl: './language-content.component.html',
  styleUrls: ['./language-content.component.scss']
})

export class LanguageContentComponent implements OnInit {
  pageIsEditable: boolean;

  id: number;
  language: WebinarsLanguage;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.language = {
      id: 0,
      languageName: ''
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
        path: `api/Supports/Learning/InsiderWebinars/List/Language/${this.id}`,
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
          path: `api/Supports/Learning/InsiderWebinars/List/Language`,
          disableLanguage: true
        },
        this.language,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/vwa/insider-webinars-list/language']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Supports/Learning/InsiderWebinars/List/Language/${this.id}`,
          disableLanguage: true
        },
        this.language,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/vwa/insider-webinars-list/language']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

}
