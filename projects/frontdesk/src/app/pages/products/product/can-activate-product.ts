import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { getProductNameByUrl } from '@frontdesk/core/utils/product-utils';

@Injectable({
  providedIn: 'root'
})
export class CanActivateProduct implements CanActivate {

  constructor(
    private router: Router,
    private vvtkApiService: VvtkApiService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const productName = getProductNameByUrl(route.params.productName);
    return this.vvtkApiService.post({
      path: 'api/Products/IsExisted',
      disableLanguage: true
    }, { name: productName })
      .pipe(
        catchError(error => of(false)),
        tap(isProduct => {
          if (!isProduct) {
            this.router.navigate(['404'], {
              queryParams: {
                q: route.url.map(path => path.path).join(' ')
              }
            });
          }
        })
      );
  }
}
