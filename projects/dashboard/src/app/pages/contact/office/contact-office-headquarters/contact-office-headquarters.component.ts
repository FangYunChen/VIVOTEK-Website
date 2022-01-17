import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactOfficeHeadquarters } from '../../../../vvtk-core/classes/contactOffice';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-contact-office-headquarters',
  templateUrl: './contact-office-headquarters.component.html',
  styleUrls: ['./contact-office-headquarters.component.scss']
})
export class ContactOfficeHeadquartersComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  data: ContactOfficeHeadquarters;
  isLoading = false;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        this.getData();
      }
    );
  }
  getData() {
    this.vvtkService.get(
      {
        path: `api/Office/Headquarters`
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

    this.vvtkService.patch(
      {
        path: `api/Office/Headquarters`
      },
      this.data,
      {
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
