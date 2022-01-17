import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactSubject, Handler } from '../../../../vvtk-core/classes/contact';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-contact-subject-content',
  templateUrl: './contact-subject-content.component.html',
  styleUrls: ['./contact-subject-content.component.scss']
})
export class ContactSubjectContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;

  id: number;
  data: ContactSubject;
  handler: Handler[] = [];
  selectedHandler: string[] = [];

  filterBcc: String = '';

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.data = {
      id: 0,
      subject: '',
      handler: []
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
        this.getHandler();
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }

  getHandler() {
    this.vvtkService.getEditableAccountsByUrl('/contact/content/0', {
      next: resp => {
        const body = resp.json();
        this.handler = body || [];
      }
    });
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Contact/Subject/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();
          this.data = body;
          this.selectedHandler = [];
          if (this.data.handler) {
            this.data.handler.forEach(handler => {
              this.selectedHandler.push(handler.id);
            });
          }
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    this.data.handler = [];
    this.selectedHandler.forEach(selectedHandler => {
      const find = this.handler.find(handler => {
        return handler.id === selectedHandler;
      });
      if (find) {
        this.data.handler.push({
          id: selectedHandler
        });
      }
    });

    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Contact/Subject`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/contact/subjects/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Contact/Subject/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/contact/subjects/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
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

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
