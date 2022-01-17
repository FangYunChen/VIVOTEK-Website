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
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { DeleteConfirmComponent, DeleteConfirmResult } from '../../../../../shared/components/delete-confirm/delete-confirm.component';
import { IconType } from '../../../../../vvtk-core/interface/icon';
import { CommonSelectOption } from '../../../../../vvtk-core/interface/common-model';

@Component({
  selector: 'vvtk-icon-type-list',
  templateUrl: './icon-type-list.component.html'
})
export class IconTypeListComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;
  lockDelete = false;

  displayedColumns = [
    'name',
    'action'
  ];

  allTypes: IconType[] = [];

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
    this.getAllTypes();
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/public/icons/type/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/public/icons/type/0'
    );

    const filterValueChange$ = this.filter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const sortChange$ = this.sort.sortChange.pipe(
      startWith({ active: 'name', direction: 'asc' }),
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

  getAllTypes() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Icons/IconTypes/All`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.allTypes = body;
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  private reloadData(filter: string, sort: Sort, page: PageEvent) {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Icons/IconTypes`,
        disableLanguage: true,
        query: {
          name: filter,
          pageIndex: page.pageIndex,
          pageSize: page.pageSize,
          sort: sort.direction ? sort.direction : ''
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

  delete(id: number, typeName: string) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      disableClose: false,
      data: {
        title: `Delete ${typeName}`,
        options: this.allTypes.map(x => <CommonSelectOption>{
          value: x.id,
          optionText: x.name
        }),
        placeholder: 'Icon Type'
      }
    });
    dialogRef.afterClosed().subscribe((result: DeleteConfirmResult) => {
      if (result && result.value) {
        this.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/Icons/IconTypes/${id}`,
            disableLanguage: true,
            query: {
              alternativeTypeId: result.value
            }
          },
          {
            next: resp => {
              this.reloadData(
                this.filter.value || '',
                this.sort,
                this.paginator);
            },
            finally: () => {
              this.isLoading = false;
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
