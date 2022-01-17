import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { SupportArticle, SupportArticleList } from 'projects/dashboard/src/app/vvtk-core/interface/support-article';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { MatTableDataSource, MatPaginator, PageEvent, MatDialog } from '@angular/material';
import { ConfirmComponent } from 'projects/dashboard/src/app/shared/components/confirm/confirm.component';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'vvtk-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator: MatPaginator;

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;
  selectedLanguage$: Subscription;
  isLoading = false;
  totalCount: number;

  displayedColumns = [
    'id',
    'headline',
    'publishAt',
    'updatedAt',
    'updatedUser',
    'action'
  ];

  dataSource = new MatTableDataSource<SupportArticle>();

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
    this.getSelectedLanguage();

    // 分頁切換時，重新取得資料
    this.paginator.page.subscribe((page: PageEvent) => {
      this.reloadData(page.pageIndex, page.pageSize);
    });
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.reloadData(0, 10);
      }
    );
  }

  private reloadData(pageIndex: number, pageSize: number, productTypeSubRoute: string = '') {
    this.isLoading = true;
    this.vvtkApiService.post<SupportArticleList>(
      {
        path: `api/support/articles/brief`,
        disableLanguage: false
      },
      {
        pageIndex: pageIndex,
        pageSize: pageSize,
        productTypeSubRoute: productTypeSubRoute
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

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete support article?',
        message: `Delete article id：${id}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkApiService.delete({
          path: `api/support/articles/${id}`,
          disableLanguage: true
        }).subscribe(
          _ => this.getSelectedLanguage(),
          error => this.isLoading = false
        );
      }
    });
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
