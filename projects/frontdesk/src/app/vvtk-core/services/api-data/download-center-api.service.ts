import { Injectable } from '@angular/core';
import { VvtkApiService } from '../vvtk-api.service';
import {
  DocumentTypeQueryResult,
  DocumentPropertyMapping,
  DownloadCenterMain,
  PropertyContent,
  DownloadQuery,
  DownloadDocumentType,
  ProductDownloadQuery,
  ProductDownload
} from '@frontdesk/core/interfaces/download-center';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VvtkService } from '../vvtk.service';
import { CommonLazyLoadTableResponse } from '@frontdesk/core/interfaces/common-model';
import { PropertyType } from '@frontdesk/core/constants/dynamic-table-constant';
import { Router } from '@angular/router';
import { I18nService } from '@frontdesk/core/services';

@Injectable({
  providedIn: 'root'
})
export class DownloadCenterApiService {

  eMainId: string;
  ePropertyId: string;
  eDownloadQureryString: string;
  routerUrl: string;
  constructor(
    private vvtkService: VvtkService,
    private vvtkApiService: VvtkApiService,
    private router: Router,
    private i18nService: I18nService,
  ) {
    this.routerUrl = this.router.url;
  }

  getDocumentTypes() {
    return this.vvtkApiService.get<DownloadDocumentType[]>({
      path: `api/DownloadCenter/DocumentTypes`,
      disableLanguage: true
    });
  }

  getDocumentTypeId(rootToCurrentDocumentType: string[]): Observable<DocumentTypeQueryResult> {
    return this.vvtkApiService.post<DocumentTypeQueryResult>({
      path: `api/DownloadCenter/DocumentTypes/Id`,
      disableLanguage: true
    }, rootToCurrentDocumentType);
  }

  /** 打API判斷是否有權限，有權限API會true，沒權限會回傳BadRequest(400) */
  checkDocumentTypePermitted(documentType: DocumentTypeQueryResult) {
    return this.vvtkApiService.get({
      path: `api/DownloadCenter/DocumentTypes/${documentType.currentDocumentType}/Permission`,
      disableLanguage: true,
      needAuth: true
    }).pipe(
      map(_ => documentType)
    );
  }

  getDocumentPropertyMapping(documentTypeId: number) {
    return this.vvtkApiService.get<DocumentPropertyMapping[]>({
      path: `api/DownloadCenter/DocumentTypes/${documentTypeId}/properties`,
      disableLanguage: true,
      query: `isEnabled=true`
    });
  }

  /** 取得一般的下載資料 */
  getDownloadData(query: DownloadQuery, lang: string = 'global') {
    return this.vvtkApiService.post<CommonLazyLoadTableResponse<DownloadCenterMain>>({
      path: `api/DownloadCenter/Mains`,
      language: lang
    }, query).pipe(
      tap(data => {
        data.list.forEach(download => this.setPropertyContents(download, lang));
      })
    );
  }

  /** 取得Product相關下載資料 */
  getProductDownloadData(language: string, query: ProductDownloadQuery) {
    return this.vvtkApiService.post<CommonLazyLoadTableResponse<ProductDownload>>({
      path: `api/DownloadCenter/Mains/Search`,
      language: language
    }, query).pipe(
      tap(data => {
        data.list.forEach(productDownload => {
          productDownload.downloadMains.forEach(downloadMain => this.setPropertyContents(downloadMain, language));
        });
      })
    );
  }

  private setPropertyContents(download: DownloadCenterMain, lang: string) {
    download.propertyContents.forEach(x => this.setDownloadContent(download.id, download.documentTypeName, x, lang));
    download.propertyContents.push({ id: 0, content: download.documentTypeName, type: 1 });
    download.propertyContentMap = this.getPropertyContentMap(download);
  }

  private setDownloadContent(mainId: number, documentTypeName: string, propertyContent: PropertyContent, lang: string = 'global') {
    if (propertyContent.type === PropertyType.DownloadUrl) {
      // propertyContent.content = this.vvtkService.toUrl({
      //   path: `api/DownloadCenter/Download`,
      //   query: `mainId=${mainId}&propertyId=${propertyContent.id}`,
      //   language: lang
      // });
      if (documentTypeName === 'ANPR package' && this.routerUrl !== this.i18nService.getSelectedLanguageForLink() + '/downloads/anpr-package') {
        propertyContent.content =  this.i18nService.getSelectedLanguageForLink() + '/downloads/anpr-package';
        return;
      }
      if (documentTypeName === 'Counting FW' && this.routerUrl !== this.i18nService.getSelectedLanguageForLink() + '/downloads/counting-camera-firmware') {
        propertyContent.content =  this.i18nService.getSelectedLanguageForLink() + '/downloads/counting-camera-firmware';
        return;
      }
      if (documentTypeName === 'SDK' && this.routerUrl !== this.i18nService.getSelectedLanguageForLink() + '/downloads/sdk') {
        propertyContent.content =  this.i18nService.getSelectedLanguageForLink() + '/downloads/sdk';
        return;
      }
      this.ePropertyId = propertyContent.id.toString();
      this.eMainId = mainId.toString();

      this.vvtkApiService.get<string>({
        path: `api/DownloadCenter/EncryptDownload/${this.eMainId}_${this.ePropertyId}`,
        disableLanguage: true,
      }).subscribe(
        resp => {
          this.eDownloadQureryString = resp;
          propertyContent.content = this.vvtkService.toUrl({
            path: `api/DownloadCenter/Download`,
            query: this.eDownloadQureryString, // `mainId=${this.eMainId}&propertyId=${this.ePropertyId}`,
            language: lang
          });
        });

    }
    // if (propertyContent.type === PropertyType.CheckBoxDownload) {
    //   propertyContent.content = mainId.toString() + '_'
    //   + propertyContent.id.toString() + ';' + lang;
    // }
  }

  private getPropertyContentMap(download: DownloadCenterMain) {
    return new Map<number, string>(download.propertyContents.map(
      x => [x.id, x.content] as [number, string])
    );
  }


}
