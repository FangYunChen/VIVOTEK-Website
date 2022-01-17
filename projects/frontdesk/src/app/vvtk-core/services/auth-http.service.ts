import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/**
 * 需要送出驗證資訊的 Http 工具
 * @export
 * @class AuthHttpService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: Http, private authService: AuthService) {}

  get(
    api: string,
    isSubject = true,
    headers = new Headers()
  ): Observable<Response> {
    return this.getSubjectObservableResponse(
      this.http.get(`${environment.apiUrl}/${api}`, {
        headers: headers,
        withCredentials: true
      }),
      isSubject
    );
  }

  post(
    api: string,
    data: any,
    isSubject = true,
    headers = new Headers()
  ): Observable<Response> {
    return this.getSubjectObservableResponse(
      this.http.post(`${environment.apiUrl}/${api}`, data, {
        headers: headers,
        withCredentials: true
      }),
      isSubject
    );
  }

  put(
    api: string,
    data: any,
    isSubject = true,
    headers = new Headers()
  ): Observable<Response> {
    return this.getSubjectObservableResponse(
      this.http.put(`${environment.apiUrl}/${api}`, data, {
        headers: headers,
        withCredentials: true
      }),
      isSubject
    );
  }

  patch(
    api: string,
    data: any,
    isSubject = true,
    headers = new Headers()
  ): Observable<Response> {
    return this.getSubjectObservableResponse(
      this.http.patch(`${environment.apiUrl}/${api}`, data, {
        headers: headers,
        withCredentials: true
      }),
      isSubject
    );
  }

  delete(
    api: string,
    isSubject = true,
    headers = new Headers()
  ): Observable<Response> {
    return this.getSubjectObservableResponse(
      this.http.delete(`${environment.apiUrl}/${api}`, {
        headers: headers,
        withCredentials: true
      }),
      isSubject
    );
  }

  private getSubjectObservableResponse(
    resp$: Observable<Response>,
    isSubject: boolean
  ): Observable<Response> {
    resp$ = resp$.pipe(
      catchError((error: Response) => {
        if (error.status === 401) {
          this.authService.logout(); // api 回覆 User 沒有登入
        } else if (error.status === 403) {
          // api 回覆 User 沒有權限
        }
        return of(error);
      })
    );
    if (isSubject) {
      const subj$ = new Subject<Response>();
      resp$.subscribe(subj$);
      return subj$;
    } else {
      return resp$;
    }
  }
}
