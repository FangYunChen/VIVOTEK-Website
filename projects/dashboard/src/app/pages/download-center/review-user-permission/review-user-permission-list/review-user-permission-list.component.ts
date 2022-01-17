import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommonSelectOption } from 'projects/dashboard/src/app/vvtk-core/interface/common-model';
import { UserBasicModel } from 'projects/dashboard/src/app/vvtk-core/interface/user-model';
import { AuthService } from 'projects/dashboard/src/app/vvtk-core/services/auth.service';
import { ReplaySubject } from 'rxjs';
import { finalize, filter } from 'rxjs/operators';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { DownloadDropdownListService } from '../../services/download-dropdown-list.service';
import {
  ReviewUserPermissionContentComponent, ReviewUserPermissionData
} from '../review-user-permission-content/review-user-permission-content.component';
import { DownloadCenterApplication } from 'projects/dashboard/src/app/vvtk-core/interface/download-center';

@Component({
  selector: 'vvtk-review-user-permission-list',
  templateUrl: './review-user-permission-list.component.html'
})
export class ReviewUserPermissionListComponent implements OnInit {

  pageIsEditable: boolean;
  permissionDocumentTypeOptions: CommonSelectOption[] = [];
  dataSource$ = new ReplaySubject<UserBasicModel[]>(1);
  displayedColumns = [
    'nameAndEmail',
    'action'
  ];
  isLoading = false;

  constructor(
    private vvtkApiService: VvtkApiService,
    private authService: AuthService,
    private sharedService: SharedService,
    private dropdownService: DownloadDropdownListService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.dropdownService.getPermissionDocumentTypeOptions()
      .subscribe(x => this.permissionDocumentTypeOptions = x);
    this.getApplyPermissionUsers();
  }

  private getApplyPermissionUsers() {
    this.isLoading = true;
    this.vvtkApiService.get<UserBasicModel[]>({
      path: `api/DownloadCenter/Reviewers/Applicants`,
      disableLanguage: true
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      resp => this.dataSource$.next(
        resp.filter(this.authService.excludeSelf())
      )
    );
  }

  reviewUserPermission(userId: string, userName: string) {
    this.isLoading = true;
    this.getUserApplyPermissions(userId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        permissions => {
          const reviewUserPermissionData: ReviewUserPermissionData = {
            title: `Review ${userName}'s permissions.`,
            reviewDocumentTypes: permissions.map(n => ({
              documentTypeId: n.documentTypeId,
              documentTypeText: this.permissionDocumentTypeOptions.find(x => x.value === n.documentTypeId).optionText
            }))
          };

          const dialogRef = this.dialog
            .open<ReviewUserPermissionContentComponent, ReviewUserPermissionData, DownloadCenterApplication[]>(
              ReviewUserPermissionContentComponent, {
                disableClose: false,
                data: reviewUserPermissionData
              }
            );

          dialogRef.afterClosed()
            .pipe(filter(x => x && x.length > 0))
            .subscribe(result => {
              this.isLoading = true;
              this.vvtkApiService.post({
                path: `api/DownloadCenter/Applicants/${userId}`,
                disableLanguage: true
              }, result).pipe(
                finalize(() => this.isLoading = false)
              ).subscribe(
                _ => this.getApplyPermissionUsers()
              );
            });
        }
      );
  }

  private getUserApplyPermissions(userId: string) {
    return this.vvtkApiService.get<DownloadCenterApplication[]>({
      path: `api/DownloadCenter/Applicants/${userId}`,
      disableLanguage: true
    });
  }

}
