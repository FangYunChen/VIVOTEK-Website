import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of, ReplaySubject, Subject } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, finalize, share, takeUntil, tap } from 'rxjs/operators';
import { PropertyType } from '../../../../vvtk-core/constants/download-center-constant';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';
import { DownloadCenterMainDetail, PropertyContent } from '../../../../vvtk-core/interface/download-center';
import { DropdownListService } from '../../../../vvtk-core/services/dropdown-list.service';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { DownloadDropdownListService } from '../../services/download-dropdown-list.service';

@Component({
  selector: 'vvtk-download-content',
  templateUrl: './download-content.component.html'
})
export class DownloadContentComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;

  selectPTemp: string;
  selectTTemp: string;
  id: number;
  mainDetail: DownloadCenterMainDetail;

  documentTypeOptions: CommonSelectOption[] = [];
  allProductOptions: CommonSelectOption[] = [];
  filteredProductOptions: CommonSelectOption[] = [];
  properties: PropertyContent[] = [];
  propertyType = PropertyType;
  productDocumentTypes: CommonSelectOption[] = [];

  filterProductKeyword = '';
  filterProductKeyword$: ReplaySubject<string> = new ReplaySubject<string>(1);

  isLoading = false;

  destroy$ = new Subject();
  path = 'DownloadCenter';

  get isAddDownload(): boolean {
    return this.id === 0;
  }

  get isDisplayProductOption() {
    return this.mainDetail.documentTypeId ? this.checkIsProductDocumentType(this.mainDetail.documentTypeId) : false;
  }

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private dropdownListService: DropdownListService,
    private downloadDropdownListService: DownloadDropdownListService,
    private router: Router
  ) {
    this.mainDetail = {
      id: 0,
      documentTypeId: 0,
      propertyContents: [],
      isHide: false
    };
  }

  ngOnInit() {
    this.route.queryParams.subscribe((value) => {
      this.selectPTemp = value['selectP'];
      this.selectTTemp = value['selectT'];
    });
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.downloadDropdownListService.getDocumentTypeOptions(true)
      .subscribe(x => {
        this.documentTypeOptions = x;
        this.productDocumentTypes = x.filter(y => this.downloadDropdownListService.isProductDocumentType(y));
      });

    this.dropdownListService.getAllProductOptions()
      .subscribe(x => this.filteredProductOptions = this.allProductOptions = x);

    this.filterProductKeyword$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    ).subscribe((keyword: string) => {
      keyword = keyword.toLowerCase();
      this.filteredProductOptions = this.allProductOptions.filter(x => x.optionText.toLowerCase().includes(keyword));
    });

    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.sharedService.selectedLanguage$.pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        tap(_ => this.isLoading = true),
        concatMap(
          _ => combineLatest(
            this.getProperies(),
            this.getDownloadData()
          ).pipe(finalize(() => this.isLoading = false))
        )
      ).subscribe(([properties, detail]: [PropertyContent[], DownloadCenterMainDetail]) => {
        this.mainDetail = detail;
        const propertyMap = new Map<number, string>(detail.propertyContents.map(x => [x.id, x.content] as [number, string]));
        this.properties = properties.map(property => {
          property.content = propertyMap.get(property.id);
          if (property.content && property.type === this.propertyType.Date) {
            // 為了匯入資料格式另外處理的區塊
            property.content = property.content.length > 5 ?
              // 像是2014.10.31的直接轉日期字串
              new Date(property.content).toISOString() :
              // 像是43307(excel日期數字)的處理邏輯後轉日期字串
              new Date((+property.content - (25567 + 2)) * 86400 * 1000).toISOString();
          }
          return property;
        });
      });
    });
  }

  checkIsProductDocumentType(documentTypeId: number): boolean {
    if (documentTypeId === 3 || documentTypeId === 36 || documentTypeId === 37) {
      return true;
    } else {
      return this.productDocumentTypes.some(x => x.value === documentTypeId);
    }
  }

  getProperies() {
    return this.vvtkApiService.get<PropertyContent[]>({
      path: `api/DownloadCenter/Properties`,
      disableLanguage: true
    });
  }

  getDownloadData() {
    return this.isAddDownload ?
      of(this.mainDetail)
      : this.vvtkApiService.get<DownloadCenterMainDetail>({
        path: `api/DownloadCenter/Mains/${this.id}`,
      });
  }

  uploadFile($event) {
    this.isLoading = true;
    const file: File = $event.target.files[0];
    const fileName = `${this.path}/${file.name}`;
    this.vvtkApiService.uploadFile(file, fileName).pipe(
      tap(data => this.properties.forEach(property => {
        if (property.type === this.propertyType.DownloadUrl) {
          property.content = data.link;
        }
      })),
      concatMap(data => this.vvtkApiService.getFileSize(data.link)),
      finalize(() => {
        this.isLoading = false;
        $event.target.value = null;
      })
    ).subscribe(size => this.setFileSizeContent(size));
  }

  downloadUrlChange(url: string) {
    this.isLoading = true;
    this.vvtkApiService.getFileSize(url).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      size => this.setFileSizeContent(size),
      error => this.setFileSizeContent('0')
    );
  }

  setFileSizeContent(size: string) {
    this.properties.forEach(property => {
      if (property.type === this.propertyType.FileSize) {
        property.content = size;
      }
    });
  }

  save() {
    this.isLoading = true;
    const save$ = this.isAddDownload ?
      this.vvtkApiService.post({
        path: `api/DownloadCenter/Mains/Create`
      }, this.postData)
      : this.vvtkApiService.patch({
        path: `api/DownloadCenter/Mains/${this.id}`,
      }, this.postData);
    save$.pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.router.navigate(['/download-center/download'], {queryParams: {selectT: this.selectTTemp, selectP: this.selectPTemp}})
    );
  }

  get postData() {
    const postData: DownloadCenterMainDetail = this.toolsService.copyObject(this.mainDetail);
    postData.propertyContents = this.properties;
    if (!this.checkIsProductDocumentType(postData.documentTypeId)) {
      delete postData.productId;
    }
    postData.propertyContents.forEach(c => {
      c.content = c.content || '';
      delete c.type;
      delete c.name;
    });
    return postData;
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
