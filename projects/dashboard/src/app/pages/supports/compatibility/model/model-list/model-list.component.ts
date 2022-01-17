import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { of, ReplaySubject, Subject } from 'rxjs';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  share,
  startWith,
  takeUntil,
  map,
  finalize
} from 'rxjs/operators';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { CommonSelectOption, CommonLazyLoadTableResponse } from '../../../../../vvtk-core/interface/common-model';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';
import { SupportBrand, SupportModel } from '../../../../../vvtk-core/interface/support-compatibility';
import { DropdownListService } from '../../services/dropdown-list.service';

@Component({
  selector: 'vvtk-model-list',
  templateUrl: './model-list.component.html'
})
export class ModelListComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;

  displayedColumns = [
    'id',
    'brandName',
    'name',
    'websiteUrl',
    'action'
  ];

  brandOptions: CommonSelectOption[] = [];
  dataSource$ = new ReplaySubject<CommonLazyLoadTableResponse<SupportModel>>(1);
  destroy$ = new Subject();

  @ViewChild('filter') filter: NgModel;
  @ViewChild('selectedBrand') selectedBrand: NgModel;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private dropdownListService: DropdownListService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/supports/compatibility/model/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/compatibility/model/0'
    );

    this.dropdownListService.getBrandOptions().subscribe(
      options => this.brandOptions = options
    );

    const filterValueChange$ = this.filter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const selectedBrandValueChange$ = this.selectedBrand.valueChanges.pipe(
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const paginationChange$ = this.paginator.page.pipe(
      startWith({ pageIndex: 0, pageSize: 10 }),
      share(),
      takeUntil(this.destroy$)
    );

    of('')
      .pipe(combineLatest(filterValueChange$, selectedBrandValueChange$, paginationChange$))
      .subscribe(([_, filter, brandId, page]: [any, string, number, PageEvent]) => {
        this.reloadData(filter, brandId, page);
      });
  }

  private reloadData(filter: string, brandId: number, page: PageEvent) {
    this.isLoading = true;
    this.vvtkApiService.get<CommonLazyLoadTableResponse<SupportModel>>({
      path: `api/SupportCL/Models`,
      disableLanguage: true,
      query: {
        brandId: brandId,
        name: filter,
        pageIndex: page.pageIndex,
        pageSize: page.pageSize
      }
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      resp => this.dataSource$.next(resp)
    );
  }

  delete(id: number, modelName: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete support model?',
        message: `Delete this model：${modelName}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkApiService.delete({
          path: `api/SupportCL/Models/${id}`,
          disableLanguage: true
        }).pipe(
          finalize(() => this.isLoading = false)
        ).subscribe(
          _ => this.reloadData(
            this.filter.value || '',
            this.selectedBrand.value,
            this.paginator
          )
        );
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
