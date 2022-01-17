import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  CheckListData,
  CheckListDialogComponent
} from 'projects/dashboard/src/app/shared/components/check-list-dialog/check-list-dialog.component';
import { CommonCheckSelectOption, CommonSelectOption } from 'projects/dashboard/src/app/vvtk-core/interface/common-model';
import { UserBasicModel } from 'projects/dashboard/src/app/vvtk-core/interface/user-model';
import { AuthService } from 'projects/dashboard/src/app/vvtk-core/services/auth.service';
import { finalize, debounceTime, distinctUntilChanged, share, takeUntil, startWith, combineLatest, map, filter} from 'rxjs/operators';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { DownloadDropdownListService } from '../../services/download-dropdown-list.service';
import { NgModel } from '@angular/forms';
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { of, ReplaySubject, Subject, forkJoin, Observable } from 'rxjs';
import { VvtkService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk.service';
import { Account } from '../../../../vvtk-core/classes/account';

@Component({
  selector: 'vvtk-user-permission-list',
  templateUrl: './user-permission-list.component.html'
})
export class UserPermissionListComponent implements OnInit {

  pageIsEditable: boolean;
  permissionDocumentTypeOptions: CommonSelectOption[] = [];
  dataSource$ = new ReplaySubject<{ count: number; users: Account[] }>(1); // = new ReplaySubject<UserBasicModel[]>(1);
  destroy$ = new Subject();
  documentTypeOptions$: Observable<CommonSelectOption[]>;

  @ViewChild('filter') filter: NgModel;
  @ViewChild('selectedDocumentType') selectedDocumentType: NgModel;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = [
    'Email',
    'FirstName',
    'LastName',
    'Company',
    'Website',
    'CountryName',
    'DocTypeName',
    'action'
  ];
  isLoading = false;

  private get permissionDocumentTypeOptions$() {
    return this.dropdownService.getPermissionDocumentTypeOptions();
  }

  private get reviwers$() {
    return this.vvtkApiService.getEditableAccountsByUrl('/download-center/review-user-permission');
  }

  private get accountList$() {
    return this.vvtkApiService.get<Account[]>({
      path: `api/Accounts/All`,
      disableLanguage: true
    });
  }

  constructor(
    private vvtkApiService: VvtkApiService,
    private authService: AuthService,
    private sharedService: SharedService,
    private dropdownService: DownloadDropdownListService,
    private vvtkService: VvtkService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.isLoading = true;
    this.permissionDocumentTypeOptions$
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(options => {
        this.permissionDocumentTypeOptions = options;

      });

    const filterValueChange$ = this.filter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const selectedDocumentTypeValueChange$ = this.selectedDocumentType.valueChanges.pipe(
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const sortChange$ = this.sort.sortChange.pipe(
      startWith({ active: 'displayName', direction: 'active' }),
      share(),
      takeUntil(this.destroy$)
    );

    const paginationChange$ = this.paginator.page.pipe(
      startWith({ pageIndex: 0, pageSize: 100 }),
      share(),
      takeUntil(this.destroy$)
    );

    of('')
    .pipe(combineLatest(filterValueChange$, selectedDocumentTypeValueChange$, sortChange$, paginationChange$))
    .subscribe(([_,filter, selectedDocumentType, sort, page]: [any, string, string, Sort, PageEvent]) => {
      this.reloadData(filter, selectedDocumentType, sort, page);
    });

    this.documentTypeOptions$ = this.dropdownService.getDocumentTypeOptions(true)
      .pipe(
        map(options => options
          .map(option => this.dropdownService.isProductDocumentType(option, false) ?
            ({ ...option, disabled: true }) :
            option
          )
        )
      );
  }

  updateUserPermission(userId: string, userName: string) {
    this.isLoading = true;
    this.getUserPermission(userId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        reviewerPermissions => {
          const checkListData: CheckListData = {
            title: `Cancel ${userName}'s permission.`,
            options: this.permissionDocumentTypeOptions.map(typeOption => <CommonCheckSelectOption>{
              ...typeOption,
              checked: false
            }).filter(o =>  reviewerPermissions.includes(+o.value))
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
                path: `api/DownloadCenter/Applicants/Permission/${userId}`,
                disableLanguage: true
              }, result.map(x => +x.value)).pipe(
                finalize(() => this.isLoading = false)
              ).subscribe(
                _ => this.reloadData(this.filter.value,this.selectedDocumentType.value,this.sort,this.paginator)
              );
            }
          });
        }
      );
  }

  private getUserPermission(userId: string) {
    return this.vvtkApiService.get<number[]>({
      path: `api/DownloadCenter/Applicants/Permission/${userId}`,
      disableLanguage: true
    });
  }

  private reloadData(filter: string, selectedDocType: string, sort: Sort, page: PageEvent) {
    this.isLoading = true;
    return this.vvtkApiService.get(
      {
        path: `api/Accounts/DownloadCenter/UsersPermission/`,
        disableLanguage: true,
        query: {
          searchBy: '',
          searchValue: filter,
          searchDocType: selectedDocType,
          orderBy: sort.active,
          sort: sort.direction,
          start: page.pageSize * page.pageIndex,
          limit: page.pageSize
        }
      }
    ).subscribe((userpermission) => {
      this.dataSource$.next(userpermission);
      this.isLoading = false;
    });
  }

  selectDocumentType(documentTypeId: number) {

  }
}
