import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog, MatPaginator, PageEvent, MatSort, Sort } from '@angular/material';
import { ReplaySubject, Subject, Observable, combineLatest } from 'rxjs';
import {
  distinctUntilChanged,
  share,
  startWith,
  takeUntil,
  finalize,
  map,
  debounceTime,
} from 'rxjs/operators';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';
import { CommonSelectOption, CommonLazyLoadTableResponse } from '../../../../vvtk-core/interface/common-model';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { DownloadDropdownListService } from '../../services/download-dropdown-list.service';
import { DropdownListService } from '../../../../vvtk-core/services/dropdown-list.service';
import { DownloadCenterMain, DownloadCenterProperty } from '../../../../vvtk-core/interface/download-center';
import { PropertyType } from '../../../../vvtk-core/constants/download-center-constant';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vvtk-download-certificate-list',
  templateUrl: './download-certificate-list.component.html',
  styleUrls: ['./download-certificate-list.component.scss']
})
export class DownloadCertificateListComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;

  dynamicColumns: DownloadCenterProperty[];
  displayedColumns: string[];

  documentTypeOptions$: Observable<CommonSelectOption[]>;
  allProductOptions: CommonSelectOption[] = [];
  filteredProductOptions: CommonSelectOption[] = [];

  dataSource$ = new ReplaySubject<CommonLazyLoadTableResponse<DownloadCenterMain>>(1);
  destroy$ = new Subject();
  propertyType = PropertyType;
  selectT: number;
  selectP: number;

  @ViewChild('selectedDocumentType') selectedDocumentType: NgModel;
  @ViewChild('selectedProduct') selectedProduct: NgModel;
  @ViewChild('filterProductKeyword') filterProductKeyword: NgModel;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private dropdownListService: DropdownListService,
    private downloadDropdownListService: DownloadDropdownListService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((value) => {
      this.selectT = value['selectT'] ? Number(value['selectT']) : null;
      this.selectP = value['selectP'] ? Number(value['selectP']) : null;
    });
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/download-center/download-certificate/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/download-center/download-certificate/0'
    );

    this.documentTypeOptions$ = this.downloadDropdownListService.getDocumentTypeOptions(true)
      .pipe(map(x => [{ optionText: '--', value: null }, ...x]));

    this.dropdownListService.getAllProductOptions()
      .subscribe(x => this.filteredProductOptions = this.allProductOptions = [{ optionText: '--', value: null }, ...x]);

    this.filterProductKeyword.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    ).subscribe((keyword: string) => {
      keyword = keyword.toLowerCase();
      this.filteredProductOptions = this.allProductOptions.filter(x => x.optionText.toLowerCase().includes(keyword));
    });

    const selectedLanguage$ = this.sharedService.selectedLanguage$.pipe(
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    // const selectedDocumentTypeValueChange$ = this.selectedDocumentType.valueChanges.pipe(
    //   distinctUntilChanged(),
    //   share(),
    //   takeUntil(this.destroy$)
    // );

    const selectedProductValueChange$ = this.selectedProduct.valueChanges.pipe(
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const sortChange$ = this.sort.sortChange.pipe(
      startWith({ active: 'id', direction: 'asc' }),
      share(),
      takeUntil(this.destroy$)
    );

    const paginationChange$ = this.paginator.page.pipe(
      startWith({ pageIndex: 0, pageSize: 10 }),
      share(),
      takeUntil(this.destroy$)
    );

    combineLatest(
      selectedLanguage$,
      selectedProductValueChange$,
      sortChange$,
      paginationChange$
    ).subscribe(([lang, productId, sort, page]: [string, number, Sort, PageEvent]) => {
      this.reloadData(3, productId, sort, page);
    });
  }

  private reloadData(documentTypeId: number, productId: number, sort: Sort, page: PageEvent) {
    this.isLoading = true;
    combineLatest(
      this.getProperties(),
      this.getData(documentTypeId, productId, sort, page)
    ).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(([properties, data]: [DownloadCenterProperty[], CommonLazyLoadTableResponse<DownloadCenterMain>]) => {
      this.dynamicColumns = properties;
      this.displayedColumns = [
        'id',
        'documentTypeName',
        'productName',
        'action',
        ...properties.map(x => x.name)];
      this.dataSource$.next(data);
    });
  }

  getData(documentTypeId: number, productId: number, sort: Sort, page: PageEvent) {
    return this.vvtkApiService.post<CommonLazyLoadTableResponse<DownloadCenterMain>>(
      {
        path: `api/DownloadCenter/Mains`
      },
      {
        documentTypeId: documentTypeId,
        productId: productId,
        orderBy: sort.active,
        sort: sort.direction,
        pageIndex: page.pageIndex,
        pageSize: page.pageSize
      }, new HttpHeaders(), null).pipe(
        map(resp => {
          resp.list.forEach(download => {
            download.propertyContentMap = new Map<number, string>(download.propertyContents.map(
              x => [x.id, x.content] as [number, string])
            );
          });
          return resp;
        })
      );
  }

  getProperties() {
    return this.vvtkApiService.get<DownloadCenterProperty[]>({
      path: `api/DownloadCenter/Certificate/properties`,
      disableLanguage: true,
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete this download?',
        message: `Delete this download id：${id}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkApiService.delete({
          path: `api/DownloadCenter/Mains/${id}`,
          disableLanguage: true
        }).pipe(
          finalize(() => this.isLoading = false)
        ).subscribe(
          _ => this.reloadData(
            this.selectedDocumentType.value,
            this.selectedProduct.value,
            this.sort,
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
