import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { of, ReplaySubject, Subject } from 'rxjs';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  share,
  startWith,
  takeUntil
} from 'rxjs/operators';
import { Account } from '../../../vvtk-core/classes/account';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit, OnDestroy {
  pageContentIsViewable: boolean;
  isLoading = false;

  displayedColumns = [
    'email',
    'identityRole',
    'displayName',
    'mobile',
    'company',
    'status',
    'action'
  ];

  dataSource$ = new ReplaySubject<{ count: number; users: Account[] }>(1);
  destroy$ = new Subject();

  @ViewChild('filter') filter: NgModel;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/account/content/new'
    );

    const filterValueChange$ = this.filter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const sortChange$ = this.sort.sortChange.pipe(
      startWith({ active: 'displayName', direction: 'active' }),
      share(),
      takeUntil(this.destroy$)
    );

    const paginationChange$ = this.paginator.page.pipe(
      startWith({ pageIndex: 0, pageSize: 100 }),
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
        path: `api/Accounts`,
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

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
