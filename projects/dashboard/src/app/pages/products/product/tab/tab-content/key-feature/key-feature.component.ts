import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { ProductFeature } from '../../../../../../vvtk-core/interface/product';
import { ToolsService } from '../../../../../../vvtk-core/services/tools.service';

@Component({
  selector: 'vvtk-key-feature',
  templateUrl: './key-feature.component.html',
  styleUrls: ['./key-feature.component.scss']
})
export class KeyFeatureComponent implements OnInit {

  pageIsEditable = false;
  features: ProductFeature[] = [];

  groupOptions: SortablejsOptions = {
    group: 'group',
    handle: '.drag-handle',
    animation: 300,
    onUpdate: (event: any) => {
      this.changeDisplayOrder();
    }
  };

  constructor(
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  addFeature(idx: number) {
    this.toolsService.lockScrollTop();
    this.features.splice(idx, 0, {
      id: 0,
      content: '',
      displayOrder: 0
    });
    this.changeDisplayOrder();
  }

  deleteFeature(idx: number) {
    this.features.splice(idx, 1);
  }

  changeDisplayOrder() {
    this.features.forEach((val, idx) => { val.displayOrder = idx + 1; });
  }

}
