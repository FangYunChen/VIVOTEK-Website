import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  CheckListData,
  CheckListDialogComponent
} from 'projects/dashboard/src/app/shared/components/check-list-dialog/check-list-dialog.component';
import { CommonCheckSelectOption, CommonSelectOption } from 'projects/dashboard/src/app/vvtk-core/interface/common-model';
import { UserBasicModel } from 'projects/dashboard/src/app/vvtk-core/interface/user-model';
import { AuthService } from 'projects/dashboard/src/app/vvtk-core/services/auth.service';
import { ReplaySubject, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { DownloadDropdownListService } from '../../services/download-dropdown-list.service';

@Component({
  selector: 'vvtk-reviewer-permission-list',
  templateUrl: './reviewer-permission-list.component.html'
})
export class ReviewerPermissionListComponent implements OnInit {

  pageIsEditable: boolean;
  permissionDocumentTypeOptions: CommonSelectOption[] = [];
  dataSource$ = new ReplaySubject<UserBasicModel[]>(1);
  displayedColumns = [
    'nameAndEmail',
    'action'
  ];
  isLoading = false;

  private get permissionDocumentTypeOptions$() {
    return this.dropdownService.getPermissionDocumentTypeOptions();
  }

  private get reviwers$() {
    return this.vvtkApiService.getEditableAccountsByUrl('/download-center/review-user-permission');
  }
  private get countingFWreviwers$() {
    return this.vvtkApiService.getEditableAccountsByUrl('/download-center/review-user-permission-counting-camara');
  }

  constructor(
    private vvtkApiService: VvtkApiService,
    private authService: AuthService,
    private sharedService: SharedService,
    private dropdownService: DownloadDropdownListService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.isLoading = true;
    forkJoin(
      this.permissionDocumentTypeOptions$,
      this.reviwers$,
      this.countingFWreviwers$,
    )
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(([options, reviewers, countingFWreviewers]) => {
        this.permissionDocumentTypeOptions = options;
        var AllReviewer = reviewers.concat(countingFWreviewers);
        var temp = reviewers;//用於id判斷重複
        var result = [];//最後的新陣列
        //遍歷c陣列，將每個item.id在temp中是否存在值做判斷， 
        AllReviewer.map((item,index)=>{
        if(!temp[item.id]){
        result.push(item);
        temp[item.id] = true
        }
        })
        this.dataSource$.next(
          result.filter(this.authService.excludeSelf())
        );
      });
  }

  updateReviewerPermission(userId: string) {
    this.isLoading = true;
    this.getReviewerPermission(userId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        reviewerPermissions => {
          const checkListData: CheckListData = {
            title: 'Select the type that this user can review.',
            options: this.permissionDocumentTypeOptions.map(typeOption => <CommonCheckSelectOption>{
              ...typeOption,
              checked: reviewerPermissions.includes(+typeOption.value)
            })
          };

          const dialogRef = this.dialog
            .open<CheckListDialogComponent, CheckListData, CommonCheckSelectOption[]>(CheckListDialogComponent, {
              disableClose: false,
              data: checkListData
            });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.isLoading = true;
              this.vvtkApiService.post({
                path: `api/DownloadCenter/Reviewers/${userId}`,
                disableLanguage: true
              }, result.map(x => +x.value)).pipe(
                finalize(() => this.isLoading = false)
              ).subscribe();
            }
          });
        }
      );
  }

  private getReviewerPermission(userId: string) {
    return this.vvtkApiService.get<number[]>({
      path: `api/DownloadCenter/Reviewers/${userId}`,
      disableLanguage: true
    });
  }

}
