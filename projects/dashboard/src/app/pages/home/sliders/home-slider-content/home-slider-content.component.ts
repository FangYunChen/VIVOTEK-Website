import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeSlider } from '../../../../vvtk-core/classes/homeSlider';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-home-slider-content',
  templateUrl: './home-slider-content.component.html',
  styleUrls: ['./home-slider-content.component.scss']
})
export class HomeSliderContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  id: number;
  data: HomeSlider;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.data = {
      displayOrder: 0,
      h1: '',
      h2: '',
      href: '',
      imgWeb: {
        src: '',
        alt: '',
        title: ''
      },
      imgTable: {
        src: '',
        alt: '',
        title: ''
      },
      imgMobile: {
        src: '',
        alt: '',
        title: ''
      },
      imgProduct: {
        src: '',
        alt: '',
        title: ''
      },
      isEnabled: true
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
        path: `api/Home/Slider/${this.id}`
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
          path: `api/Home/Slider`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/home/sliders/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Home/Slider/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/home/sliders/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  imgFileSelect($event, imgName: string) {
    const file: File = $event.target.files[0];
    this.data[imgName].title = file.name;
    this.data[imgName].alt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `Home/Slider/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.data[imgName].src = x.link
      );
  }

  typeof(obj) {
    return typeof obj;
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
