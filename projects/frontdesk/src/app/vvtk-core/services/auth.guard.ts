import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/**
 * 權限
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('here');
    return this.authService.checkLogin().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          if (this.authService.isViewable(state.url)) {
            // 已登入、有權限
            return true;
          } else {
            // 已登入、沒權限
            const navigationExtras: NavigationExtras = {
              queryParams: {
                request: state.url
              }
            };
            this.router.navigate(
              [environment.forbiddenRedirectRoute],
              navigationExtras
            );
            return false;
          }
        } else {
          // 沒有登入
          const navigationExtras: NavigationExtras = {
            queryParams: {
              redirect: state.url
            }
          };
          this.router.navigate(
            [environment.unauthorizedRedirectRoute],
            navigationExtras
          );
          return false;
        }
      })
    );
  }
}
