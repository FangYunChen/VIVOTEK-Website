import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ReplaySubject, forkJoin, Subject } from 'rxjs';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';
import { DatasheetTypeList } from '../../../../vvtk-core/constants/product-constant';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';
import { DropdownListService } from '../../../../vvtk-core/services/dropdown-list.service';
import { finalize, debounceTime, distinctUntilChanged, share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vvtk-datasheet-list',
  templateUrl: './datasheet-list.component.html'
})
export class DatasheetListComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;

  allProductOptions: CommonSelectOption[] = [];
  filteredProductOptions: CommonSelectOption[] = [];
  types: CommonSelectOption[] = DatasheetTypeList;
  languages: CommonSelectOption[] = [];

  displayedColumns = [
    'version',
    'isCurrent',
    'action'
  ];

  dataSource$ = new ReplaySubject<{ list: { id: number, version: string, filePath: string, isCurrent: boolean }[] }>(1);
  destroy$ = new Subject();

  @ViewChild('selectedProduct') selectedProduct: NgModel;
  @ViewChild('filterProductKeyword') filterProductKeyword: NgModel;
  @ViewChild('selectedType') selectedType: NgModel;
  @ViewChild('selectedLang') selectedLang: NgModel;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private dropdownListService: DropdownListService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/products/datasheet/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/products/datasheet/0'
    );

    this.getOptions();
    this.filterProductKeyword.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    ).subscribe((keyword: string) => {
      keyword = keyword.toLowerCase();
      this.filteredProductOptions = this.allProductOptions.filter(x => x.optionText.toLowerCase().includes(keyword));
    });
  }

  getOptions() {
    this.isLoading = true;
    forkJoin(
      this.dropdownListService.getAllProductOptions(),
      this.dropdownListService.getAllLangOptions()
    ).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      ([productOptions, langOptions]) => {
        this.filteredProductOptions = this.allProductOptions = [{ optionText: '--', value: null }, ...productOptions];
        this.languages = langOptions;
      }
    );
  }

  search() {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Products/${this.selectedProduct.value}/Datasheets/${this.selectedType.value}`,
        language: this.selectedLang.value
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

  setCurrentVersion(datasheetId: number, version: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Set datasheet version',
        message: `Are you sure you want to set this datasheet version:${version}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkService.patch(
          {
            path: `api/Products/Datasheets/${datasheetId}`,
            disableLanguage: true
          },
          {
            version: version
          },
          {
            next: resp => {
              this.getData();
            },
            finally: () => {
              this.isLoading = false;
            }
          }
        );
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
