import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { ApiPath } from '../classes/api';
import { VvtkService } from './vvtk.service';
import { ToolsService } from './tools.service';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { pipe, throwError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService, SysModuleViewModel } from './auth.service';
import { UserBasicModel } from '../interface/user-model';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class VvtkApiService {

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private toolsService: ToolsService,
    private vvtkService: VvtkService,
    private authService: AuthService
  ) { }

  //#region Http request
  get<T = any>(apiPath: ApiPath, headers = new HttpHeaders(), successMsg: string = null) {
    const apiUrl: string = this.vvtkService.apiPath2Url(apiPath);
    return this.http.get<T>(`${environment.apiUrl}/${apiUrl}`, {
      headers: headers,
      withCredentials: true
    }).pipe(this.apiHandler(successMsg)) as Observable<T>;
  }

  post<T = any>(apiPath: ApiPath, data: any = null, headers = new HttpHeaders(), successMsg: string = 'save success') {
    const apiUrl: string = this.vvtkService.apiPath2Url(apiPath);
    return this.http.post<T>(`${environment.apiUrl}/${apiUrl}`, data, {
      headers: headers,
      withCredentials: true
    }).pipe(this.apiHandler(successMsg)) as Observable<T>;
  }

  patch<T = any>(apiPath: ApiPath, data: any = null, headers = new HttpHeaders(), successMsg: string = 'save success') {
    const apiUrl: string = this.vvtkService.apiPath2Url(apiPath);
    return this.http.patch<T>(`${environment.apiUrl}/${apiUrl}`, data, {
      headers: headers,
      withCredentials: true
    }).pipe(this.apiHandler(successMsg)) as Observable<T>;
  }

  put<T = any>(apiPath: ApiPath, data: any = null, headers = new HttpHeaders(), successMsg: string = 'save success') {
    const apiUrl: string = this.vvtkService.apiPath2Url(apiPath);
    return this.http.put<T>(`${environment.apiUrl}/${apiUrl}`, data, {
      headers: headers,
      withCredentials: true
    }).pipe(this.apiHandler(successMsg)) as Observable<T>;
  }

  delete<T = any>(apiPath: ApiPath, headers = new HttpHeaders(), successMsg: string = 'delete success') {
    const apiUrl: string = this.vvtkService.apiPath2Url(apiPath);
    return this.http.delete<T>(`${environment.apiUrl}/${apiUrl}`, {
      headers: headers,
      withCredentials: true
    }).pipe(this.apiHandler(successMsg)) as Observable<T>;
  }
  //#endregion

  private apiHandler(successMsg) {
    return pipe(
      tap(_ => {
        if (successMsg) {
          this.toolsService.showSnackBar(successMsg, 3000);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout(); // api 回覆 User 沒有登入
        }
        if (error.error) {
          this.toolsService.showSnackBar(`API error: ${error.error.message}`, 3000);
        } else {
          this.toolsService.showSnackBar(error.message, 3000);
        }
        return throwError(error);
      })
    );
  }

  getEditableAccountsByUrl(url: string) {
    return this.get<UserBasicModel[]>({
      path: `api/Accounts/IsEditable`,
      disableLanguage: true,
      query: {
        id: this.getModuleIdByUrl(url)
      }
    });
  }

  getEditableAccounts(url: string) {
    return this.get<UserBasicModel[]>({
      path: `api/Accounts/All`,
      disableLanguage: true
    });
  }

  private getModuleIdByUrl(url: string, modules: SysModuleViewModel[] = null) {
    if (modules == null) {
      const userData = this.authService.userData;
      modules = userData && userData['modules'] ? userData.modules : [];
    }

    for (const i of modules) {
      if (new RegExp(`^${i.route}$`).test(url)) {
        return i.id;
      } else if (i.childModules && i.childModules.length > 0) {
        const result = this.getModuleIdByUrl(url, i.childModules);
        if (result) {
          return result;
        }
      }
    }

    return 0;
  }

  //#region Handle file
  downloadFile(apiPath: ApiPath, headers = new HttpHeaders(), successMsg: string = null) {
    const apiUrl: string = this.vvtkService.apiPath2Url(apiPath);
    return this.http.get(`${environment.apiUrl}/${apiUrl}`, {
      headers: headers,
      withCredentials: true,
      responseType: 'blob',
      observe: 'response'
    }).pipe(this.apiHandler(successMsg)) as Observable<HttpResponse<Blob>>;
  }

  uploadFile(file: File, filename: string): Observable<{ link: string; }> {
    // 先透過filename確定是否有檔案，再詢問是否上傳，如果已有則開啟dialog並詢問是否上傳，無則直接上傳
    const uploadFile$ = this.post<{ link: string }>(
      {
        path: 'api/Upload',
        disableLanguage: true
      },
      this.toolsService.dataToFormData({
        file: file,
        filename: filename
      }),
      new HttpHeaders(),
      'uploaded'
    );
    const confirmOverwriteFile$ = (link: string) => {
      const dialogRef = this.matDialog.open(ConfirmComponent, {
        disableClose: false,
        data: {
          title: 'File is existed',
          message: `Are you sure you want to overwrite file?`
        }
      });
      return dialogRef.afterClosed().pipe(switchMap(result => !!result ? uploadFile$ : of({ link })));
    };
    return this.post<{ isExisted: boolean, link: string }>(
      {
        path: 'api/CheckFileIsExisted',
        disableLanguage: true
      },
      { filename },
      new HttpHeaders(),
      ''
    ).pipe(
      switchMap(result => result.isExisted ? confirmOverwriteFile$(result.link) : uploadFile$)
    );
  }

  getFileSize(url: string): Observable<string> {
    return this.post<string>(
      {
        path: 'api/DownloadCenter/FileSize',
        disableLanguage: true
      },
      { url: url },
      new HttpHeaders(),
      'get file size success'
    );
  }
  //#endregion

}
