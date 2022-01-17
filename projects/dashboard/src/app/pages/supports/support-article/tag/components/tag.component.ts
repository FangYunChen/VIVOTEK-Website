import { Component, OnInit, OnDestroy } from '@angular/core';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { SupportArticleTagEditorComponent } from './support-article-tag-editor/support-article-tag-editor.component';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { Tags } from 'projects/dashboard/src/app/vvtk-core/interface/support-article';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vvtk-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})

export class TagComponent implements OnInit, OnDestroy {

  selectedLanguage$: Subscription;
  displayedColumns = ['id', 'name', 'action'];
  isLoading = false;
  pageIsEditable: boolean;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getData();
      }
    );
  }

  getData() {
    this.vvtkApiService.get<Tags[]>({
      path: `api/Support/Tags`,
      disableLanguage: false
    }).subscribe(res => {
      this.dataSource.data = res;
    });
  }

  edit(id: number) {
    this.dialog.open(SupportArticleTagEditorComponent, {
      disableClose: true,
      data: {
        id: id
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.getData();
      }
    });
  }

  delete(id: number) {
    this.vvtkApiService.delete(
      {
        path: `api/support/tags/${id}`,
        disableLanguage: true
      }
    ).subscribe(
      _ => this.getData()
    );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }

}
