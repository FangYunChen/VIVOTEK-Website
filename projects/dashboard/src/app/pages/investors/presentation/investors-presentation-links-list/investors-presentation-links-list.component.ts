import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';
import { InvestorsPresentationLink } from '../../../../vvtk-core/classes/investorsPresentationLink';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-investors-presentation-links-list',
  templateUrl: './investors-presentation-links-list.component.html',
  styleUrls: ['./investors-presentation-links-list.component.scss']
})
export class InvestorsPresentationLinksListComponent
  implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  selectedLanguage$: Subscription;
  data: { year: number; items: InvestorsPresentationLink[] }[];

  isLoading = true;
  lockDelete = false;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300,
    onUpdate: (event: any) => {
      this.patchSequence();
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
      '/investors/presentation/link/content/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/investors/presentation/link/content/0'
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
        path: `api/Investors/Presentation/Links`
      },
      {
        next: resp => {
          const body: InvestorsPresentationLink[] = resp.json() || [];
          this.data = [];
          body.forEach(item => {
            const find = this.data.find(dataItem => {
              return dataItem.year === item.year;
            });
            if (find) {
              find.items.push(item);
            } else {
              this.data.push({
                year: item.year,
                items: [item]
              });
            }
          });
          this.data.sort((a, b) => {
            return a.year < b.year ? 1 : -1;
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
            path: `api/Investors/Presentation/Link/${id}`,
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
    const sequenceData: InvestorsPresentationLink[] = [];
    let sequence = 1;
    for (const dataItem of this.data) {
      for (const item of dataItem.items.slice().reverse()) {
        sequenceData.push({
          id: item.id,
          displayOrder: sequence
        });
        sequence++;
      }
    }

    this.vvtkService.patch(
      {
        path: `api/Investors/Presentation/Links/DisplayOrder`,
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
