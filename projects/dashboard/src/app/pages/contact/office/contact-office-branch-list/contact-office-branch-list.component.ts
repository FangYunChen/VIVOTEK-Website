import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';
import {
  ContactOfficeBranch,
  ContactCountrySqeuence
} from '../../../../vvtk-core/classes/contactOffice';
import { Country } from '../../../../vvtk-core/classes/continent';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-contact-office-branch-list',
  templateUrl: './contact-office-branch-list.component.html',
  styleUrls: ['./contact-office-branch-list.component.scss']
})
export class ContactOfficeBranchListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  selectedLanguage$: Subscription;
  data: {
    country: Country;
    data: ContactOfficeBranch[];
  }[];

  isLoading = true;
  lockDelete = false;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300,
    onUpdate: (event: any) => {
      this.patchSequence();
    }
  };
  countryGroupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300,
    onUpdate: (event: any) => {
      this.patchCountrySequence();
    }
  };

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/contact/offices/branch/content/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/contact/offices/branch/content/0'
    );

    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getData();
      }
    );
  }

  getData() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Office/Branch/List`
      },
      {
        next: resp => {
          const body = resp.json() || [];
          this.data = [];

          body.forEach((branchItem: ContactOfficeBranch) => {
            let find = this.data.find(dataItem => {
              return branchItem.country.id === dataItem.country.id;
            });
            if (!find) {
              find = {
                country: branchItem.country,
                data: []
              };
              this.data.push(find);
            }
            find.data.push(branchItem);
          });

          this.data.sort((a, b) => {
            return a.country.displayOrder < b.country.displayOrder ? 1 : -1;
          });
          this.data.forEach(branch => {
            branch.data.sort((a, b) => {
              return a.displayOrder < b.displayOrder ? 1 : -1;
            });
          });
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  delete(id: number, title: string) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'delete?',
        message: `確定刪除：${title}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/Office/Branch/${id}`,
            disableLanguage: true
          },
          {
            next: resp => {
              this.getData();
            },
            finally: () => {
              this.isLoading = false;
            }
          }
        );
      } else {
      }
      this.lockDelete = false;
    });
  }

  patchSequence() {
    this.isLoading = true;
    const sequenceData: ContactOfficeBranch[] = [];
    let sequence = 0;
    for (const data of this.data.slice().reverse()) {
      for (const item of data.data.slice().reverse()) {
        sequenceData.push({
          id: item.id,
          displayOrder: sequence
        });
        sequence++;
      }
      sequence = 0;
    }

    this.vvtkService.patch(
      {
        path: `api/Office/Branch/DisplayOrder`,
        disableLanguage: true
      },
      sequenceData,
      {
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  patchCountrySequence() {
    this.isLoading = true;
    const sequenceData: ContactCountrySqeuence[] = [];
    let sequence = 0;
    for (const data of this.data.slice().reverse()) {
      sequenceData.push({
        id: data.country.id,
        countryDisplayOrder: sequence
      });
      sequence++;
    }

    this.vvtkService.patch(
      {
        path: `api/Office/Branch/CountryDisplayOrder`,
        disableLanguage: true
      },
      sequenceData,
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
