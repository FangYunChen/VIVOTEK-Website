import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, Subscription, of } from 'rxjs';
import { tap, switchMap, takeUntil, catchError, finalize } from 'rxjs/operators';

import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { ProductMainInfo } from '../../interfaces/product-main-info';
import { ProductTabInfo } from '../../interfaces/product-tab-info';
import { ProductCategoryRoutes } from '../../interfaces/product-category-route';
import { getProductNameByUrl } from '@frontdesk/core/utils/product-utils';
import { UserLoginViewModel } from '@frontdesk/core/interfaces/user-login-view-model';
import { AuthService } from '@frontdesk/core/services/auth.service';

@Component({
  selector: 'vvtk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  productMainInfo: ProductMainInfo;
  productTabInfos: ProductTabInfo[];
  productCategoryRoutes: ProductCategoryRoutes[] = [];
  productMask = false;
  showMsg = '';
  userSub$: Subscription;

  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private vvtkApiService: VvtkApiService, private Navroute: Router
  ) {
    this.route.params.subscribe(params => {
      const productName = getProductNameByUrl(params.productName);
      if(productName === 'shepherd'){
        this.Navroute.navigate(['/Shepherd']);
      }
      else {
        this.loadProduct(productName);
      }
    });
  }

  ngOnInit() {
  }

  applyOpen($event) {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProduct(name: string) {
    this.loadProductMainInfoByName(name)
      .pipe(
        switchMap(productMainInfo => forkJoin(
          this.loadProductTabsInfoById(productMainInfo.id),
          this.loadProductCategoryRoutes(productMainInfo.id),
        )),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  redirect() {
    this.Navroute.navigateByUrl('/');
  }

  private loadProductMainInfoByName(name: string) {
    return this.vvtkApiService.post<ProductMainInfo>({
      path: `api/Products/details`
    }, { name }).pipe(
      tap(
        data => {
          if(data.reviewState !== 3){
            this.userSub$ = this.authService
            .getUserData()
            .pipe(
              catchError(error => {
                console.error('An error occurred', error);
                return of(error);
              }),
              finalize(() => {
                if (this.userSub$) {
                  this.userSub$.unsubscribe();
                }
              })
            )
            .subscribe((userLoginData: UserLoginViewModel) => {
              if(userLoginData == null)
                this.Navroute.navigate(['404'], {
                  queryParams: {
                    q: name
                  }
                });
              if(userLoginData.email.indexOf('@vivotek.com') < 0)
                this.Navroute.navigate(['404'], {
                  queryParams: {
                    q: name
                  }
                });
              else {
                if (data && data.msg) {
                  this.showMsg = data.msg;
                  this.productMask = true;
                } else {
                  this.productMainInfo = data;
                }
              }
            });
          } else {
            if (data && data.msg) {
              this.showMsg = data.msg;
              this.productMask = true;
            } else {
              this.productMainInfo = data;
            }
          }
        }
      )
    );
  }

  private loadProductTabsInfoById(id: number) {
    return this.vvtkApiService.get<ProductTabInfo[]>({
      path: `api/Products/${id}/details/tabs`
    }).pipe(
      tap(
        data => {
          this.productTabInfos = data;
        }
      )
    );
  }

  private loadProductCategoryRoutes(id: number) {
    return this.vvtkApiService.get<ProductCategoryRoutes[]>({
      path: `api/Products/${id}/CategoryPath`
    }).pipe(
      tap(
        data => {
          this.productCategoryRoutes = data;
        }
      )
    );
  }

}
