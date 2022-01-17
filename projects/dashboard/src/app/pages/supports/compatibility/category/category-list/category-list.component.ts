import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { SupportCategory } from '../../../../../vvtk-core/interface/support-compatibility';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;

  displayedColumns = [
    'id',
    'name',
    'action'
  ];

  dataSource$: Observable<SupportCategory[]>;

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/supports/compatibility/category/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/compatibility/category/0'
    );
    this.reloadData();
  }

  private reloadData() {
    this.isLoading = true;
    this.dataSource$ = this.vvtkApiService.get<SupportCategory[]>({
      path: `api/SupportCL/Categories`,
      disableLanguage: true
    }).pipe(
      finalize(() => this.isLoading = false)
    );
  }

  delete(id: number, categoryName: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete support category?',
        message: `Delete this category：${categoryName}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkApiService.delete({
          path: `api/SupportCL/Categories/${id}`,
          disableLanguage: true
        }).subscribe(
          _ => this.reloadData(),
          error => this.isLoading = false
        );
      }
    });
  }

}
