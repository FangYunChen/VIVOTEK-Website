import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AboutAward } from '../../../../vvtk-core/classes/aboutAward';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-about-award-content',
  templateUrl: './about-award-content.component.html',
  styleUrls: ['./about-award-content.component.scss']
})
export class AboutAwardContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;

  id: number;
  data: AboutAward;

  years: number[] = [];
  months: number[] = [];

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
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }

    this.data = {
      year: this.years[3],
      month: this.months[0],
      image: {
        alt: '',
        title: '',
        src: ''
      },
      title: '',
      description: '',
      url: ''
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
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      { path: `api/Award/${this.id}` },
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
          path: `api/Award`,
          disableLanguage: false
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/awards/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Award/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/awards/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  imgFileSelect($event) {
    const file: File = $event.target.files[0];
    this.data.image.title = file.name;
    this.data.image.alt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `About/Awards/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.data.image.src = x.link
      );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
