import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize, concatMap } from 'rxjs/operators';
import { SortablejsOptions } from 'angular-sortablejs/dist';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';
import { SupportFeature } from '../../../../vvtk-core/interface/support-compatibility';
import { DropdownListService } from '../services/dropdown-list.service';

@Component({
  selector: 'vvtk-feature',
  templateUrl: './feature.component.html'
})
export class FeatureComponent implements OnInit {

  pageIsEditable: boolean;

  isLoading = false;

  groupOptions: SortablejsOptions = {
    group: 'group',
    handle: '.drag-handle',
    animation: 300
  };

  selectedSupportProduct: number;
  selectedSupportCategory: number;
  supportProducts: CommonSelectOption[] = [];
  supportCategories: CommonSelectOption[] = [];

  supportFeatures: SupportFeature[] = [];

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private dropdownListService: DropdownListService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.isLoading = true;
    this.dropdownListService.getProductOptions().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      supportProducts => this.supportProducts = supportProducts
    );
  }

  selectedSupportProductChange() {
    this.isLoading = true;
    this.dropdownListService.getCategoryOptions(this.selectedSupportProduct).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      supportCategories => {
        this.supportCategories = supportCategories;
        this.selectedSupportCategory = null;
        this.supportFeatures = [];
      }
    );
  }

  selectedSupportCategoryChange() {
    if (this.selectedSupportCategory && this.selectedSupportProduct) {
      this.getSupportFeatures().pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        features => this.supportFeatures = features
      );
    }
  }

  getSupportFeatures() {
    this.isLoading = true;
    return this.vvtkApiService.get<SupportFeature[]>({
      path: `api/SupportCL/Products/${this.selectedSupportProduct}/Categories/${this.selectedSupportCategory}/Features`,
      disableLanguage: true
    });
  }

  addFeature(idx: number) {
    this.toolsService.lockScrollTop();
    const clone: SupportFeature[] = this.toolsService.copyObject(this.supportFeatures);
    clone.splice(idx, 0, {
      id: 0,
      name: '',
      displayOrder: 0,
      isEnabled: true
    });
    this.supportFeatures = clone;
  }

  deleteFeature(idx: number) {
    this.supportFeatures.splice(idx, 1);
  }

  save() {
    this.setDisplayOrder();
    this.isLoading = true;
    this.vvtkApiService.post({
      path: `api/SupportCL/Products/${this.selectedSupportProduct}/Categories/${this.selectedSupportCategory}/Features`,
      disableLanguage: true
    }, this.supportFeatures).pipe(
      concatMap(_ => this.getSupportFeatures()),
      finalize(() => this.isLoading = false)
    ).subscribe(
      features => this.supportFeatures = features
    );
  }

  setDisplayOrder() {
    this.supportFeatures.forEach((val, idx) => { val.displayOrder = idx + 1; });
  }
}
