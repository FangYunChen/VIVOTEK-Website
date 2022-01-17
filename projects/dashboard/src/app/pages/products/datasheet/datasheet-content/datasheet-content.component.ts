import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';
import { DatasheetTypeList } from '../../../../vvtk-core/constants/product-constant';
import { ProductDatasheet } from '../../../../vvtk-core/interface/product-datasheet';
import { DropdownListService } from '../../../../vvtk-core/services/dropdown-list.service';
import { finalize, debounceTime, distinctUntilChanged, share, takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { NgModel } from '@angular/forms';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-datasheet-content',
  templateUrl: './datasheet-content.component.html'
})
export class DatasheetContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  path = 'Product/Datasheet';

  datasheet: ProductDatasheet;
  isLoading = false;

  allProductOptions: CommonSelectOption[] = [];
  filteredProductOptions: CommonSelectOption[] = [];
  types: CommonSelectOption[] = DatasheetTypeList;
  languages: CommonSelectOption[] = [];

  destroy$ = new Subject();
  @ViewChild('filterProductKeyword') filterProductKeyword: NgModel;

  constructor(
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private dropdownListService: DropdownListService,
    private router: Router
  ) {
    this.datasheet = {
      version: '',
      filePath: '',
      productId: 0,
      type: 0,
      lang: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
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

  uploadFile($event) {
    const file: File = $event.target.files[0];
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.datasheet.filePath = x.link
      );
  }

  save() {
    this.isLoading = true;
    this.vvtkService.post(
      {
        path: `api/Products/${this.datasheet.productId}/Datasheets/${this.datasheet.type}/${this.datasheet.lang}`,
        disableLanguage: true
      },
      this.datasheet,
      {
        next: resp => {
          this.router.navigate(['/products/datasheet']);
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
