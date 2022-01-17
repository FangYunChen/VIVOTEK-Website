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
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { CommonSelectOption } from '../../../../../vvtk-core/interface/common-model';

@Component({
  selector: 'vvtk-image-list',
  templateUrl: './image-list.component.html'
})
export class ImageListComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;
  lockDelete = false;

  displayedColumns = [
    'name',
    'type',
    'action'
  ];

  types: CommonSelectOption[] = [];

  dataSource$ = new ReplaySubject<{ filterTotal: number; list: any[] }>(1);
  destroy$ = new Subject();

  @ViewChild('filter') filter: NgModel;
  @ViewChild('selectedType') selectedType: NgModel;
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
      '/public/images/image/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/public/images/image/0'
    );

    this.getTypes();

    const selectedLangChange$ = this.sharedService.selectedLanguage$.pipe(
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const filterValueChange$ = this.filter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const selectedTypeValueChange$ = this.selectedType.valueChanges.pipe(
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
      .pipe(combineLatest(selectedLangChange$, filterValueChange$, selectedTypeValueChange$, sortChange$, paginationChange$))
      .subscribe(([_, lang, filter, selectedType, sort, page]: [any, any, string, string, Sort, PageEvent]) => {
        this.reloadData(filter, selectedType, sort, page);
      });
  }

  getTypes() {
    this.vvtkService.get(
      {
        path: `api/ImageGroup/ImageTypes/All`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.types = body.map(x => <CommonSelectOption>{
            value: x.id,
            optionText: x.name
          });
        }
      }
    );
  }

  private reloadData(filter: string, selectedType: string, sort: Sort, page: PageEvent) {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/ImageGroup`,
        disableLanguage: true,
        query: {
          name: filter,
          typeId: selectedType,
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

  delete(id: number, imageName: string) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete image?',
        message: `Delete this image：${imageName}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.vvtkService.delete(
          {
            path: `api/ImageGroup/${id}`,
            disableLanguage: true
          },
          {
            next: resp => {
              this.reloadData(
                this.filter.value || '',
                this.selectedType.value || '',
                this.sort,
                this.paginator);
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
