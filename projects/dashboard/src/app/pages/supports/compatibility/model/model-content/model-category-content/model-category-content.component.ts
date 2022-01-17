import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SupportModelCategory, SupportFeature, SupportModelFeature } from '../../../../../../vvtk-core/interface/support-compatibility';
import { CommonSelectOption } from '../../../../../../vvtk-core/interface/common-model';
import { VvtkApiService } from '../../../../../../vvtk-core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-model-category-content',
  templateUrl: './model-category-content.component.html',
  styleUrls: ['./model-category-content.component.scss']
})
export class ModelCategoryContentComponent implements OnInit, OnChanges {

  @Input() pageIsEditable = false;
  @Input() productId: number;
  @Input() category: SupportModelCategory;
  @Input() selectedCategoryIds: Set<number> = new Set<number>();
  @Input() categoryOptions: CommonSelectOption[] = [];
  @Input() categoryIndex: number;
  @Output() categoryAdded: EventEmitter<any> = new EventEmitter();
  @Output() categoryRemoved: EventEmitter<any> = new EventEmitter();
  @Output() categorySelected: EventEmitter<any> = new EventEmitter();

  canSelectCategoryOptions: CommonSelectOption[] = [];
  supportFeatures: SupportFeature[] = [];

  get isAddCategory(): boolean {
    return this.category.id === 0;
  }

  constructor(
    private vvtkApiService: VvtkApiService
  ) { }

  ngOnInit() {
    if (!this.isAddCategory) {
      this.setSupportFeatures().subscribe(
        features => this.supportFeatures = features
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterCategoryOptions();
  }

  setSupportFeatures() {
    return this.vvtkApiService.get<SupportFeature[]>({
      path: `api/SupportCL/Products/${this.productId}/Categories/${this.category.id}/Features`,
      disableLanguage: true
    });
  }

  filterCategoryOptions() {
    this.canSelectCategoryOptions = this.categoryOptions.filter(
      option => !this.selectedCategoryIds.has(<number>option.value)
        || this.category.id === option.value
    );
  }

  selectCategory() {
    this.setSupportFeatures().subscribe(
      features => {
        this.category.features = features.map(
          feature => <SupportModelFeature>{ id: feature.id, description: '', descriptionUrl: '' }
        );
        this.supportFeatures = features;
      }
    );
    this.categorySelected.emit();
  }
}
