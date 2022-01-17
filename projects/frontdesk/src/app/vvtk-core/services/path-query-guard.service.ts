import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PathQueryGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.router.navigate(['404'], {
      queryParams: {
        q: route.url.map(path => path.path).join(' ')
      }
    });
    return true;
  }
}
