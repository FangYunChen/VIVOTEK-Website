import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from '../interfaces/api-path';
import { VvtkService } from './vvtk.service';


@Injectable({
  providedIn: 'root'
})
export class VvtkApiService {

  constructor(
    private http: HttpClient,
    private vvtkService: VvtkService
  ) { }

  get<T = any>(apiPath: ApiPath) {
    const apiUrl: string = this.vvtkService.toUrl(apiPath);
    return this.http.get<T>(apiUrl, { withCredentials: apiPath.needAuth });
  }

  post<T = any>(apiPath: ApiPath, data: any = null) {
    const apiUrl: string = this.vvtkService.toUrl(apiPath);
    return this.http.post<T>(apiUrl, data, { withCredentials: apiPath.needAuth });
  }

  patch<T = any>(apiPath: ApiPath, data: any = null) {
    const apiUrl: string = this.vvtkService.toUrl(apiPath);
    return this.http.patch<T>(apiUrl, data, { withCredentials: apiPath.needAuth });
  }

  put<T = any>(apiPath: ApiPath, data: any = null) {
    const apiUrl: string = this.vvtkService.toUrl(apiPath);
    return this.http.put<T>(apiUrl, data, { withCredentials: apiPath.needAuth });
  }

  delete<T = any>(apiPath: ApiPath) {
    const apiUrl: string = this.vvtkService.toUrl(apiPath);
    return this.http.delete<T>(apiUrl, { withCredentials: apiPath.needAuth });
  }

  downloadFileByUrl(url: string) {
    return this.http.get(url, {
      observe: 'body',
      responseType: 'blob'
    });
  }

  downloadFileByPost(apiPath: ApiPath, data: any = null): Observable<Blob> {
    const apiUrl: string = this.vvtkService.toUrl(apiPath);
    return this.http.post(apiUrl, data, {
      observe: 'body',
      responseType: 'blob'
    });
  }

}
