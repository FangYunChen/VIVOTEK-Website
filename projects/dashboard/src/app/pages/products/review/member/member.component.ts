import { Component, OnInit } from '@angular/core';
import { UserBasicModel } from 'projects/dashboard/src/app/vvtk-core/interface/user-model';
import { forkJoin, ReplaySubject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { BackendSelectedItem } from 'projects/dashboard/src/app/vvtk-core/interface/common-model';
import { AuthService } from 'projects/dashboard/src/app/vvtk-core/services/auth.service';
import { MatDialog } from '@angular/material';
import { DropdownListService } from 'projects/dashboard/src/app/vvtk-core/services/dropdown-list.service';
import { ProductCategory, ProductCategoryCheck } from 'projects/dashboard/src/app/vvtk-core/interface/product-category';
import { MemberContentComponent } from './member-content/member-content.component';

@Component({
  selector: 'vvtk-member',
  templateUrl: './member.component.html'
})
export class MemberComponent implements OnInit {

  pageIsEditable: boolean;
  productCategories: ProductCategory[] = [];
  dataSource$ = new ReplaySubject<UserBasicModel[]>(1);
  displayedColumns = [
    'nameAndEmail',
    'action'
  ];
  isLoading = false;

  private get productCategories$() {
    return this.dropdownListService.getAllProductCategories();
  }

  private get reviwers$() {
    return this.vvtkApiService.getEditableAccountsByUrl('/products/review/product');
  }

  constructor(
    private vvtkApiService: VvtkApiService,
    private authService: AuthService,
    private dropdownListService: DropdownListService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.isLoading = true;
    forkJoin(
      this.productCategories$,
      this.reviwers$
    )
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(([categories, reviewers]) => {
        this.productCategories = categories;
        this.dataSource$.next(
          reviewers.filter(this.authService.excludeSelf())
        );
      });
  }

  updateReviewerPermission(userId: string) {
    this.isLoading = true;
    this.getReviewerPermission(userId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        reviewerPermissions => {
          const categoryCheck: ProductCategoryCheck[] =
            this.productCategories.map(category => <ProductCategoryCheck>{
              ...category,
              checked: reviewerPermissions.includes(category.id)
            });

          const dialogRef = this.dialog
            .open<MemberContentComponent, ProductCategoryCheck[], number[]>(MemberContentComponent, {
              disableClose: false,
              data: categoryCheck
            });

          dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined && result !== null) {
              this.isLoading = true;
              this.vvtkApiService.post({
                path: `api/Product/Reviewers/${userId}`,
                disableLanguage: true
              }, result).pipe(
                finalize(() => this.isLoading = false)
              ).subscribe();
            }
          });
        }
      );
  }

  private getReviewerPermission(userId: string) {
    return this.vvtkApiService.get<BackendSelectedItem[]>({
      path: `api/Product/Reviewers/${userId}`,
      disableLanguage: true
    }).pipe(
      map(reviewerPermissions =>
        reviewerPermissions.map(permission => permission.id)
      )
    );
  }

}
