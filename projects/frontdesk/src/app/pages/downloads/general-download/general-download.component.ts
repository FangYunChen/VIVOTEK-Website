import { Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  GeneralDownloadOption, DownloadCenterMain,
  DownloadCenterProperty,
  DocumentTypeQueryResult,
  PropertyContentFilter,
} from '@frontdesk/core/interfaces/download-center';
import { combineLatest, Subject, ReplaySubject, BehaviorSubject, Observable } from 'rxjs';
import { concatMap, debounceTime, startWith, takeUntil, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PageEvent, MatSnackBar } from '@angular/material';
import { CommonLazyLoadTableResponse } from '@frontdesk/core/interfaces/common-model';
import { DownloadCenterApiService } from '@frontdesk/core/services/api-data/download-center-api.service';
import { I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-general-download',
  templateUrl: './general-download.component.html',
  styleUrls: ['./general-download.component.scss']
})
export class GeneralDownloadComponent implements OnInit, OnDestroy {

  @Input()
  option: GeneralDownloadOption;

  filterList: PropertyContentFilter[] = [];
  filterTimer$: Subject<string> = new Subject<string>();
  pageEvent$: BehaviorSubject<PageEvent> = new BehaviorSubject<PageEvent>({ pageSize: 10, pageIndex: 0, length: 0 });
  dataSource$ = new ReplaySubject<CommonLazyLoadTableResponse<DownloadCenterMain>>(1);
  selectedLanguage$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  destroy$ = new Subject();

  dynamicColumns: DownloadCenterProperty[];

  constructor(
    private downloadCenterApiService: DownloadCenterApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    public i18nService: I18nService
  ) { }

  ngOnInit() {
    this.downloadCenterApiService.getDocumentTypeId(this.option.documentTypeForProperty).pipe(
      concatMap(type => this.downloadCenterApiService.getDocumentPropertyMapping(type.currentDocumentType))
    ).subscribe(mappings => {
      mappings.forEach(mapping => {
        if (this.option.filters.find(x => x === mapping.name)) {
          this.filterList.push({ id: mapping.id, name: mapping.name, content: null });
        }
      });
      this.dynamicColumns = mappings;
    });

    const filter$ = this.filterTimer$.pipe(
      startWith(''),
      debounceTime(500),
      takeUntil(this.destroy$)
    );

    const paginationChange$ = this.pageEvent$.pipe(
      takeUntil(this.destroy$)
    );

    const permittedDocumentTypeId$ = this.downloadCenterApiService.getDocumentTypeId(this.option.documentTypeForData)
      .pipe(concatMap(type => this.downloadCenterApiService.checkDocumentTypePermitted(type)));

    const selectedLanguage$ = this.selectedLanguage$.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

    combineLatest(
      filter$,
      paginationChange$,
      permittedDocumentTypeId$,
      selectedLanguage$
    ).pipe(
      debounceTime(300),
      switchMap(
        ([_, page, type, selectedLanguage]: [string, PageEvent, DocumentTypeQueryResult, string]) =>
          this.getData(type.currentDocumentType, page, selectedLanguage))
    ).subscribe(
      data => this.dataSource$.next(data),
      error => {
        this.snackBar.open('You don\'t have permission to download', 'Apply', {
          duration: 30000
        }).afterDismissed().subscribe(info => {
          if (info.dismissedByAction === true) {
            if (this.option.title === 'ANPR Package') {
              this.router.navigate([this.i18nService.getSelectedLanguageForLink() + '/my-account'], {queryParams: {Auth: 'Anpr'}});
            } else if (this.option.title === 'SDK'){
              this.router.navigate([this.i18nService.getSelectedLanguageForLink() + '/my-account'], {queryParams: {Auth: 'SDK'}});
            } else {
              this.router.navigate([this.i18nService.getSelectedLanguageForLink() + '/my-account'], {queryParams: {Auth: 'Counting'}});
            }

          }
        });
      }
    );
  }

  getData(documentTypeId: number, page: PageEvent, selectedLanguage: string) {
    const query = {
      propertyContents: this.filterList.filter(x => x.content),
      documentTypeId: documentTypeId,
      pageIndex: page.pageIndex,
      pageSize: page.pageSize
    };
    return this.downloadCenterApiService.getDownloadData(query, selectedLanguage);
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
