import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { SupportBrand } from '../../../../../vvtk-core/interface/support-compatibility';

@Component({
  selector: 'vvtk-brand-list',
  templateUrl: './brand-list.component.html'
})
export class BrandListComponent implements OnInit {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;

  displayedColumns = [
    'id',
    'name',
    'websiteUrl',
    'action'
  ];

  dataSource$: Observable<SupportBrand[]>;

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/supports/compatibility/brand/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/compatibility/brand/0'
    );
    this.reloadData();
  }

  private reloadData() {
    this.isLoading = true;
    this.dataSource$ = this.vvtkApiService.get<SupportBrand[]>({
      path: `api/SupportCL/Brands`,
      disableLanguage: true
    }).pipe(
      finalize(() => this.isLoading = false)
    );
  }

  delete(id: number, brandName: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete support brand?',
        message: `Delete this brand：${brandName}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkApiService.delete({
          path: `api/SupportCL/Brands/${id}`,
          disableLanguage: true
        }).subscribe(
          _ => this.reloadData(),
          error => this.isLoading = false
        );
      }
    });
  }

}
