import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';
import { ToolsService } from '../../../../../vvtk-core/services/tools.service';
import { ProductSpecification } from '../../../../../vvtk-core/interface/product-specification';
import { finalize } from 'rxjs/operators';
import { ProductSelectorTypeOptions, ProductSelectorType } from 'projects/dashboard/src/app/vvtk-core/constants/product-selector-constant';
import { SortablejsOptions } from 'angular-sortablejs';
import { ProductSelector } from 'projects/dashboard/src/app/vvtk-core/interface/product-selector';

@Component({
  selector: 'vvtk-specification-editor',
  templateUrl: './specification-editor.component.html',
  styleUrls: ['./specification-editor.component.scss']
})
export class SpecificationEditorComponent implements OnInit, OnChanges {
  get pageIsEditable() {
    return this.sharedService.pageIsEditable;
  }

  isLoading = false;

  @Output() saved = new EventEmitter<ProductSpecification>();

  @Input()
  productCategoryId: number;

  @Input()
  set data(value: ProductSpecification) {
    this._data = this.toolsService.copyObject(value);
  }
  get data() {
    return this._data;
  }

  private _data: ProductSpecification;

  get productSelectorTypeOptions() {
    return ProductSelectorTypeOptions;
  }

  get productSelectorType() {
    return ProductSelectorType;
  }

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  constructor(
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private vvtkApiService: VvtkApiService,
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.id) {
      this.getProductSpecification(changes.data.currentValue.id);
    }
  }

  getProductSpecification(specId: number) {
    this.isLoading = true;
    this.vvtkApiService.get<ProductSpecification>({
      path: `api/Product/Specification/${specId}`
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      x => this.data = x
    );
  }

  changeSelectorType() {
    this.data.selectorOptions = this.data.selectorOptions || [];
  }

  changeIsFilter(selectors: ProductSelector[], index: number, isFilter: boolean) {
    if (isFilter) {
      selectors[index].children = [];
    }
  }

  addSelector(selectors: ProductSelector[], index: number) {
    this.toolsService.lockScrollTop();
    selectors.splice(index, 0, {
      id: 0,
      name: '',
      isFilter: true,
      children: []
    });
  }

  addChildSelector(selectors: ProductSelector[], index: number, childIdx: number) {
    this.toolsService.lockScrollTop();
    const clone: ProductSelector[] = this.toolsService.copyObject(selectors[index].children);
    clone.splice(childIdx, 0, {
      id: 0,
      name: '',
      isFilter: true,
      children: []
    });
    selectors[index].children = clone;
  }

  deleteSelector(selectors: ProductSelector[], index: number) {
    selectors.splice(index, 1);
  }

  save() {
    this.isLoading = true;
    const id = this.data.id;
    if (id && id !== 0) {
      this.vvtkApiService
        .post(
          {
            path: `api/Product/Specification/${id}`
          },
          this.postData
        )
        .pipe(
          finalize(() => { this.isLoading = false; })
        )
        .subscribe(
          () => {
            this.saved.emit(this.data);
          }
        );
    } else {
      this.vvtkApiService
        .post<ProductSpecification>(
          {
            path: `api/Product/Specification`,
            disableLanguage: true
          },
          this.postData
        )
        .pipe(
          finalize(() => { this.isLoading = false; })
        )
        .subscribe(
          data => {
            this.data.id = data.id;
            this.saved.emit(this.data);
          }
        );
    }
  }

  private get postData() {
    const postSelectorType = this.data.isAttribute ? this.data.selectorType : null;
    return {
      name: this.data.name,
      parentId: this.data.parentId,
      categoryId: this.productCategoryId,
      isAttribute: this.data.isAttribute,
      selectorType: postSelectorType,
      selectorOptions: this.getPostSelectorOptions(postSelectorType)
    };
  }

  private getPostSelectorOptions(postSelectorType: ProductSelectorType): ProductSelector[] {
    if (this.data.isAttribute && !!this.data.selectorOptions) {
      const selectorOptions = this.data.selectorOptions.map(this.recursiveSetSelectorOption());
      switch (postSelectorType) {
        case ProductSelectorType.Single:
        case ProductSelectorType.Multiple:
          // Clear range option properties
          const recursiveDeleteRangeOptionProperties = (options: ProductSelector[]) => {
            options.forEach(option => {
              delete option.maximum;
              delete option.minimum;
              delete option.unit;
              recursiveDeleteRangeOptionProperties(option.children);
            });
          };
          recursiveDeleteRangeOptionProperties(selectorOptions);
          return selectorOptions;
        case ProductSelectorType.Range:
          // Clear children options
          return selectorOptions.map(option => ({ ...option, children: [] }));
        case ProductSelectorType.YN:
          // Make options only have exactly one option
          return [
            ...selectorOptions
              .filter(option => option.id > 0 && !option.name)
              .map(option => ({ ...option, children: [] })),
            { id: 0, name: '', isFilter: true, children: [] }
          ].slice(0, 1);
      }
    }
    return null;
  }

  private recursiveSetSelectorOption() {
    return (option: ProductSelector, index: number) => ({
      ...option,
      displayOrder: index + 1,
      children: option.children.map(this.recursiveSetSelectorOption())
    } as ProductSelector);
  }

}
