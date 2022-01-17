import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatTableDataSource, PageEvent } from '@angular/material';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { ToolsAccessory, ToolsAccessoryList } from 'projects/dashboard/src/app/vvtk-core/interface/tools-accessory';
import { HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ConfirmComponent } from 'projects/dashboard/src/app/shared/components/confirm/confirm.component';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'vvtk-accessory-list',
  templateUrl: './accessory-list.component.html',
  styleUrls: ['./accessory-list.component.scss']
})

export class AccessoryListComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;
  totalCount: number;
  Keyword: string;

  displayedColumns = [
    'accessoryId',
    'modelName',
    'publishedAt',
    'action'
  ];

  dataSource = new MatTableDataSource<ToolsAccessory>();

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/supports/article/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/article/0'
    );

    this.loadData(1, 10);

    // 分頁切換時，重新取得資料
    this.paginator.page.subscribe((page: PageEvent) => {
      this.loadData(page.pageIndex + 1, page.pageSize);
    });
  }

  private loadData(pageIndex: number, pageSize: number) {
    this.isLoading = true;
    this.vvtkApiService.post<ToolsAccessoryList>(
      {
        path: `api/Tools/Accessory`,
        disableLanguage: true
      },
      {
        pageIndex: pageIndex,
        pageSize: pageSize,
        Keyword: this.Keyword
      },
      new HttpHeaders(),
      null
    ).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(res => {
      this.totalCount = res.filterTotal;
      this.dataSource.data = res.list;
    });
  }

  exportPDF(id: number, name: string) {
    this.isLoading = true;
    this.vvtkApiService.downloadFile({
      path: `api/ExportPDF/Accessory/${id}`,
      disableLanguage: true,
    })
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(response => {
        const pdf = new Blob([response.body], {
          type: 'application/pdf'
        });
        saveAs(pdf, `accessory_${id}.pdf`);
      });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete accessory?',
        message: `Delete accessory id：${id}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkApiService.delete({
          path: `api/Tools/Accessory/${id}`,
          disableLanguage: true
        }).subscribe(
          _ => this.loadData(1, 10),
          error => this.isLoading = false
        );
      }
    });
  }

}
