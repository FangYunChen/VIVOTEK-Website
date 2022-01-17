import { Component, OnInit } from '@angular/core';
import { Bcc } from '../../../vvtk-core/classes/careers';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-email-project-registration-bcc',
  templateUrl: './email-project-registration-bcc.component.html',
  styleUrls: ['./email-project-registration-bcc.component.scss']
})
export class EmailProjectRegistrationBccComponent implements OnInit {
  pageIsEditable: boolean;

  data: Bcc[] = [];
  handler: Bcc[] = [];
  selectedHandler: string[] = [];

  isLoading = false;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.getHandler();
    this.getData();
  }

  getHandler() {
    this.vvtkService.getEditableAccountsByUrl('/email/project-registration', {
      next: resp => {
        const body = resp.json();
        this.handler = body;
      }
    });
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Email/ProjectRegistration/BCC`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.data = body;
          this.selectedHandler = [];
          if (this.data) {
            this.data.forEach(handler => {
              this.selectedHandler.push(handler.id);
            });
          }
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    this.data = [];
    this.selectedHandler.forEach(handler => {
      this.data.push({
        id: handler
      });
    });

    this.vvtkService.patch(
      {
        path: `api/Email/ProjectRegistration/BCC`,
        disableLanguage: true
      },
      this.data,
      {
        next: resp => {},
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  selectedHandlerChecked(id: string) {
    return this.selectedHandler.indexOf(id) >= 0;
  }

  selectedHandlerChange(id: string, input: HTMLInputElement) {
    if (input.checked && this.selectedHandler.indexOf(id) === -1) {
      this.selectedHandler.push(id);
    } else {
      const index: number = this.selectedHandler.indexOf(id);
      if (index >= 0) {
        this.selectedHandler.splice(index, 1);
      }
    }
  }
}
