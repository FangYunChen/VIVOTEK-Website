import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSelect, MatTableDataSource } from '@angular/material';
import {
  Category,
  Feature,
  Model,
  Product
} from '../../../../vvtk-core/interfaces/compatibility';
import { CompatibilityListService } from './compatibility-list.service';
import { merge } from 'rxjs';
import { I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-compatibility-list',
  templateUrl: './compatibility-list.component.html',
  styleUrls: ['./compatibility-list.component.scss']
})
export class CompatibilityListComponent implements OnInit {
  @ViewChild('productSelector') productSelector: MatSelect;
  @ViewChild('categorySelector') categorySelector: MatSelect;
  @ViewChild('brandFilter') brandFilter: MatSelect;
  @ViewChild('modelFilter') modelFilter: MatSelect;
  initColumn = ['model', 'brand'];
  displayedColumns;
  featureColumn;
  productList: Product[];
  categoryList: Category[];
  featureList: Feature[];
  brandList: string[];
  dataSource = new MatTableDataSource<Model>();
  selectedProductId: number;
  selectedCategoryId: number;
  selectedBrand = '';
  selectedModel = '';
  constructor(private compatibilityListService: CompatibilityListService, private i18nService: I18nService) {
    this.compatibilityListService.productList$.subscribe(
      (data: Product[]) => this.productList = data
    );
    this.compatibilityListService.categoryList$.subscribe(
      (data: Category[]) => this.categoryList = data
    );
    this.compatibilityListService.featureList$.subscribe(
      (data: Feature[]) => {
        this.featureList = data.sort((prev, curr) => prev.displayOrder - curr.displayOrder);
        this.compatibilityListService.getModels(this.selectedProductId, this.selectedCategoryId);
      }
    );
    this.compatibilityListService.modelList$.subscribe(
      (data: Model[]) => {
        this.dataSource.data = data;
        this.featureColumn = this.featureList;
        this.displayedColumns = [...this.initColumn, ...this.featureList.map(item => item.name)];
        this.brandList = Array.from(new Set(data.map(item => item.brand)));
      }
    );
    this.dataSource.filterPredicate = (data: Model, filter: string) => {
      const filterObj = JSON.parse(filter) as { brand: string, model: string };
      let result = true;
      if (filterObj.model !== '') {
        result = data.model === filterObj.model;
      }
      if (filterObj.brand !== '') {
        result = result && data.brand === filterObj.brand;
      }
      return result;
    };
  }
  ngOnInit() {

    this.productSelector.valueChange.subscribe((val: number) => {
      this.resetFiler();
      this.resetTable();
      this.selectedCategoryId = null;
      this.compatibilityListService.getCategories(val);
    });

    this.categorySelector.valueChange.subscribe(_ => {
      this.resetFiler();
      this.compatibilityListService.getFeatures(this.selectedProductId, this.selectedCategoryId);
    });
    this.compatibilityListService.getProducts();

    merge(
      this.brandFilter.valueChange,
      this.modelFilter.valueChange
    ).subscribe(
      _ => this.dataSource.filter = JSON.stringify({ brand: this.selectedBrand, model: this.selectedModel })
    );
  }
  getModelFeature(featureId: number, model: Model) {
    return model.features.find(x => x.id === featureId);
  }
  resetAll() {
    this.resetFiler();
    this.resetTable();
    this.selectedProductId = null;
    this.selectedCategoryId = null;
  }
  resetTable() {
    this.dataSource.data = [];
    this.displayedColumns = [...this.initColumn];
  }
  resetFiler() {
    this.selectedBrand = '';
    this.selectedModel = '';
    this.dataSource.filter = '';
  }
  generateI18nUrl(url: string) {
    const model = url.split('/').pop();
    return `${this.i18nService.getSelectedLanguageForLink()}/${model}`;
  }
}
