import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InvestorsPresentationLink } from '../../../../vvtk-core/classes/investorsPresentationLink';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-investors-presentation-link-content',
  templateUrl: './investors-presentation-link-content.component.html',
  styleUrls: ['./investors-presentation-link-content.component.scss']
})
export class InvestorsPresentationLinkContentComponent
  implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  years: number[] = [];

  id: number;
  data: InvestorsPresentationLink;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    for (let i = 1997; i <= new Date().getFullYear() + 3; i++) {
      this.years.push(i);
    }
    this.years.reverse();

    this.data = {
      year: this.years[3],
      title: '',
      url: '',
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
        path: `api/Investors/Presentation/Links`
      },
      {
        next: resp => {
          const body = resp.json();

          const find = body.find((item: InvestorsPresentationLink) => {
            return item.id === this.id;
          });

          this.data = find || this.data;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Investors/Presentation/Link`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/investors/presentation/links/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Investors/Presentation/Link/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/investors/presentation/links/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  fileSelect($event) {
    const file: File = $event.target.files[0];
    this.data.title = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `Investors/Presentation/Link/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.data.url = x.link
      );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
