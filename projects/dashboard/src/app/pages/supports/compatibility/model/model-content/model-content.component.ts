import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../../../vvtk-core/services/tools.service';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';
import { SupportModelDetail, SupportModelProduct } from '../../../../../vvtk-core/interface/support-compatibility';
import { CommonSelectOption } from '../../../../../vvtk-core/interface/common-model';
import { DropdownListService } from '../../services/dropdown-list.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-model-content',
  templateUrl: './model-content.component.html'
})
export class ModelContentComponent implements OnInit {

  pageIsEditable: boolean;

  id: number;
  model: SupportModelDetail;

  brandOptions: CommonSelectOption[] = [];
  productOptions: CommonSelectOption[] = [];
  selectedProductIds: Set<number> = new Set<number>();

  isLoading = false;

  get isAddModel(): boolean {
    return this.id === 0;
  }

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private dropdownListService: DropdownListService,
    private router: Router
  ) {
    this.model = {
      brandId: 0,
      name: '',
      websiteUrl: '',
      products: []
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.dropdownListService.getBrandOptions().subscribe(
      options => this.brandOptions = options
    );

    this.dropdownListService.getProductOptions().subscribe(
      options => this.productOptions = options
    );

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (!this.isAddModel) {
        this.getSupportModel();
      }
    });
  }

  getSupportModel() {
    this.isLoading = true;
    this.vvtkApiService.get<SupportModelDetail>({
      path: `api/SupportCL/Models/${this.id}`,
      disableLanguage: true,
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      model => this.model = model
    );
    this.setSelectedProductIds();
  }

  setSelectedProductIds() {
    const selectedProductIds = this.model.products.map(x => x.id);
    this.selectedProductIds = new Set(selectedProductIds);
  }

  trackProduct(index, product) {
    return product ? product.id : undefined;
  }

  addProduct(idx: number) {
    this.toolsService.lockScrollTop();
    const clone: SupportModelProduct[] = this.toolsService.copyObject(this.model.products);
    clone.splice(idx, 0, {
      id: 0,
      categories: []
    });
    this.model.products = clone;
    this.setSelectedProductIds();
  }

  deleteProduct(idx: number) {
    this.model.products.splice(idx, 1);
    this.setSelectedProductIds();
  }

  save() {
    const postData = this.transformPostData(this.model);
    this.isLoading = true;
    const save$ = this.isAddModel ?
      this.vvtkApiService.post({
        path: `api/SupportCL/Models`,
        disableLanguage: true,
      }, postData)
      : this.vvtkApiService.patch({
        path: `api/SupportCL/Models/${this.id}`,
        disableLanguage: true,
      }, postData);
    save$.pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.router.navigate(['/supports/compatibility/model'])
    );
  }

  transformPostData(model: SupportModelDetail): SupportModelDetail {
    const postData: SupportModelDetail = this.toolsService.copyObject(model);
    postData.products = postData.products.filter(product =>
      product.id !== 0 &&
      product.categories.some(category => category.id !== 0)
    );
    postData.products.forEach(product => {
      product.categories = product.categories.filter(category => category.id !== 0);
    });
    return postData;
  }

}
