import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Campaign } from '../../../vvtk-core/classes/campaign';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

declare var moment: any;
@Component({
  selector: 'vvtk-campaign-content',
  templateUrl: './campaign-content.component.html',
  styleUrls: ['./campaign-content.component.scss']
})
export class CampaignContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;

  @ViewChild('editor') editor: any;
  id: number;
  campaign: Campaign;
  status: boolean;
  startAt: Date;
  endAt: Date;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.campaign = {
      title: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      description: '',
      startAt: '',
      endAt: '',
      status: 1,
      content: '',
      area: '',
      address: '',
      emailContent: '',
      stickTop: false
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
          this.getCampaign();
        }
      }
    );
  }

  getCampaign() {
    this.vvtkService.get(
      {
        path: `api/Campaign/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();

          this.campaign = body;
          this.startAt = new Date(this.campaign.startAt);
          this.endAt = new Date(this.campaign.endAt);
          this.status = body.status === 1;
          this.editor.setHtml(this.campaign.content);
        }
      }
    );
  }

  updateEditorHtml() {
    this.campaign.content = this.editor.getHtml();
  }

  save() {
    this.isLoading = true;
    this.updateEditorHtml();
    this.campaign.startAt = moment(this.startAt).format();
    this.campaign.endAt = moment(this.endAt).format();
    this.campaign.status = this.status ? 1 : 0;

    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Campaign`,
          language: 'global'
        },
        this.campaign,
        {
          next: resp => {
            this.router.navigate(['/campaigns/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Campaign/${this.id}`
        },
        this.campaign,
        {
          next: resp => {
            this.router.navigate(['/campaigns/list']);
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
    this.campaign.image.title = file.name;
    this.campaign.image.alt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `Campaign/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.campaign.image.src = x.link
      );
  }

  typeof(obj) {
    return typeof obj;
  }

  minDate() {
    if (!this.startAt) {
      return new Date(1990, 0, 1);
    }
    return new Date(this.startAt);
  }

  maxDate() {
    if (!this.endAt) {
      return new Date(9999, 0, 1);
    }
    return new Date(this.endAt);
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
