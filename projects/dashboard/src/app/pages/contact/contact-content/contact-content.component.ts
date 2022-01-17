import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../../../vvtk-core/classes/contact';
import { AuthService } from '../../../vvtk-core/services/auth.service';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

declare var moment: any;

@Component({
  selector: 'vvtk-contact-content',
  templateUrl: './contact-content.component.html',
  styleUrls: ['./contact-content.component.scss']
})
export class ContactContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;

  id: number;
  data: Contact;

  status: boolean;
  canSave = false;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router
  ) {}

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
        this.getData();
      }
    );
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Contact/Form/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();
          this.data = body;

          this.data.subject = this.data.subject || {
            id: 0,
            name: ''
          };

          const zone = moment.parseZone(new Date()).utcOffset();
          this.data.createdAt = moment(this.data.createdAt).add(
            zone,
            'minutes'
          );
          if (this.data.handledAt) {
            this.data.handledAt = moment(this.data.handledAt).add(
              zone,
              'minutes'
            );
          }

          this.status = this.data.status === 1;
          this.checkCanSave();
        }
      }
    );
  }

  checkCanSave() {
    this.canSave = false;
    if (!this.pageIsEditable) {
      return;
    }
    if (!this.data.handler) {
      // 沒有設定處理人或主旨被刪除
      this.canSave = true;
      return;
    }
    this.data.handler.forEach(handler => {
      if (handler.id === this.authService.userData.id) {
        this.canSave = true;
      }
    });
  }

  save() {
    this.isLoading = true;
    const newData: Contact = {
      note: this.data.note,
      status: this.status ? 1 : 0
    };

    this.vvtkService.patch(
      {
        path: `api/Contact/Form/${this.id}`,
        disableLanguage: true
      },
      newData,
      {
        next: resp => {
          this.router.navigate(['/contact/list']);
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
