import { Injectable } from '@angular/core';
import {
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
 * 登入
 * @export
 * @class LoginGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.checkLogin().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn === false) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              redirect: state.url
            }
          };
          this.router.navigate(
            [environment.unauthorizedRedirectRoute],
            navigationExtras
          );
        }
        return isLoggedIn;
      })
    );
  }
}
