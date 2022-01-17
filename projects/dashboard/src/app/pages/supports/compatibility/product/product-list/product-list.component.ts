import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { SupportProduct } from '../../../../../vvtk-core/interface/support-compatibility';

@Component({
  selector: 'vvtk-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;

  displayedColumns = [
    'id',
    'name',
    'categoriesText',
    'action'
  ];

  dataSource$: Observable<SupportProduct[]>;

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/supports/compatibility/product/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/compatibility/product/0'
    );
    this.reloadData();
  }

  private reloadData() {
    this.isLoading = true;
    this.dataSource$ = this.vvtkApiService.get<SupportProduct[]>({
      path: `api/SupportCL/Products`,
      disableLanguage: true
    }).pipe(
      tap(products => {
        products
          .forEach(product => product.categoriesText = product.categories
            .map(category => category.name).join(',')
          );
      }),
      finalize(() => this.isLoading = false)
    );
  }

  delete(id: number, productName: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete support product?',
        message: `Delete this product：${productName}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkApiService.delete({
          path: `api/SupportCL/Products/${id}`,
          disableLanguage: true
        }).subscribe(
          _ => this.reloadData(),
          error => this.isLoading = false
        );
      }
    });
  }

}
