import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { of, ReplaySubject, Subject } from 'rxjs';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  share,
  startWith,
  takeUntil
} from 'rxjs/operators';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import { ConfirmComponent } from '../../../../../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'vvtk-insider-webinars-list',
  templateUrl: './insider-webinars-list.component.html'
})
export class InsiderWebinarsListComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;
  lockDelete = false;

  displayedColumns = [
    'date',
    'time',
    'series',
    'title',
    'language',
    'action'
  ];

  dataSource$ = new ReplaySubject<{ filterTotal: number; list: any[] }>(1);
  destroy$ = new Subject();

  @ViewChild('filter') filter: NgModel;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/supports/learning/vwa/insider-webinars-list/list/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/learning/vwa/insider-webinars-list/list/0'
    );

    const filterValueChange$ = this.filter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const sortChange$ = this.sort.sortChange.pipe(
      startWith({ active: 'Date', direction: 'active' }),
      share(),
      takeUntil(this.destroy$)
    );

    const paginationChange$ = this.paginator.page.pipe(
      startWith({ pageIndex: 0, pageSize: 10 }),
      share(),
      takeUntil(this.destroy$)
    );

    of('')
      .pipe(combineLatest(filterValueChange$, sortChange$, paginationChange$))
      .subscribe(([_, filter, sort, page]: [any, string, Sort, PageEvent]) => {
        this.reloadData(filter, sort, page);
      });
  }

  private reloadData(filter: string, sort: Sort, page: PageEvent) {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Supports/Learning/InsiderWebinars/List/ManageList`,
        disableLanguage: true,
        query: {
          searchBy: '',
          searchValue: filter,
          orderBy: sort.active,
          sort: sort.direction,
          start: page.pageSize * page.pageIndex,
          limit: page.pageSize
        }
      },
      {
        next: resp => {
          const body = resp.json();
          this.dataSource$.next(body);
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  delete(id: number, title: string) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete Webinars List?',
        message: `Delete this title${title}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.vvtkService.delete(
          {
            path: `api/Supports/Learning/InsiderWebinars/List/${id}`,
            disableLanguage: true
          },
          {
            next: resp => {
              // tslint:disable-next-line:max-line-length
              this.reloadData(this.filter.value || '', { active: this.sort.active, direction: this.sort.direction }, { pageIndex: 0, pageSize: 10, length: null });
            }
          }
        );
      }
      this.lockDelete = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
