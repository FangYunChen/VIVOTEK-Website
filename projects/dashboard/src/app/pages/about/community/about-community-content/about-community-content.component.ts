import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutCommunity } from '../../../../vvtk-core/classes/aboutCommunity';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-about-community-content',
  templateUrl: './about-community-content.component.html',
  styleUrls: ['./about-community-content.component.scss']
})
export class AboutCommunityContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  id: number;
  data: AboutCommunity;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.data = {
      id: 0,
      title: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      url: '',
      footerEnabled: false,
      displayOrder: 0
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.getData();
      }
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Community/List`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.data = body.find((aboutCommunity: AboutCommunity) => {
            return aboutCommunity.id === this.id;
          });
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Community`,
          disableLanguage: true
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/community/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Community/${this.id}`,
          disableLanguage: true
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/community/list']);
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

    this.vvtkApiService.uploadFile(file, `About/Community/${file.name}`)
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

  ngOnDestroy() { }
}
