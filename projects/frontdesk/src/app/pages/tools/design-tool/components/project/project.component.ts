import { Component, OnInit, Input } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { DesignToolProductService } from '../../design-tool-product.service';
import { DesignToolService } from '../../design-tool.service';

@Component({
  selector: 'vvtk-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() stepper: MatStepper;

  productDisplayedColumns = [
    'name',
    'qty',
    'scenario',
    'bandWidth',
    'liveviewBandWidth',
    'storage',
    'streaming',
    'action'
  ];

  get productList() {
    return this.designToolProductService.productList;
  }

  get totalQty(): number {
    const products = this.productList.filter(product => product.q);
    if (products.length > 0) {
      return products
        .map(item => item.q)
        .reduce((total, num) => total + num, 0);
    }
  }

  get totalBandWidth(): number {
    const products = this.filterProductHasValue();
    if (products.length > 0) {
      return products
        .map(item => item.recordingBandwidth * item.qty)
        .reduce((total, num) => total + num, 0);
    }
  }

  get totalLiveviewBandWidth(): number {
    const products = this.filterProductHasValue();
    if (products.length > 0) {
      return products
        .map(item => item.liveviewBandwidth * item.qty)
        .reduce((total, num) => total + num, 0);
    }
  }

  get totalStorage(): number {
    const products = this.filterProductHasValue();
    if (products.length > 0) {
      return products
        .map(item => item.storage * item.qty)
        .reduce((total, num) => total + num, 0);
    }
  }

  get canDelete(): boolean {
    return this.productList.length > 1;
  }

  constructor(
    public designToolService: DesignToolService,
    private designToolProductService: DesignToolProductService
  ) {}

  ngOnInit() {}

  edit(index: number) {
    this.designToolProductService.productChanged(index);
  }

  delete(index: number) {
    if (this.productList.length > 1) {
      this.designToolProductService.productDeleted(index);
    }
  }

  add(index: number) {
    this.designToolProductService.productAdded(index);
  }

  getStreaming(isRecording: boolean, isLiveview: boolean) {
    return this.designToolProductService.getStreaming(isRecording, isLiveview);
  }

  filterProductHasValue() {
    return this.designToolProductService.filterProductHasValue();
  }
}
