import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AboutCSRActivity } from '../../../../vvtk-core/classes/aboutCSRActivity';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

declare const moment;

@Component({
  selector: 'vvtk-about-csractivity-content',
  templateUrl: './about-csractivity-content.component.html',
  styleUrls: ['./about-csractivity-content.component.scss']
})
export class AboutCSRActivityContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;

  @ViewChild('editor') editor: any;
  id: number;
  data: AboutCSRActivity;
  status: boolean;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.data = {
      title: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      description: '',
      status: 1,
      date: '',
      content: ''
    };
    this.status = true;
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
      {
        path: `api/CSRActivity/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();

          this.data = body;
          this.status = body.status === 1;
          this.editor.setHtml(this.data.content);
        }
      }
    );
  }

  updateEditorHtml() {
    this.data.content = this.editor.getHtml();
  }

  save() {
    this.isLoading = true;
    this.updateEditorHtml();
    this.data.status = this.status ? 1 : 0;
    this.data.date = moment(this.data.date).format('YYYY-MM-DD');

    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/CSRActivity`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/csractivities/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/CSRActivity/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/about/csractivities/list']);
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

    this.vvtkApiService.uploadFile(file, `About/CSRActivities/${file.name}`)
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
