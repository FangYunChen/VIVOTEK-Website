import { Component, OnInit } from '@angular/core';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';
import { SortablejsOptions } from 'angular-sortablejs';
import {
  ProductPdfInfo,
  PdfTemplate,
  AccessoryItem
} from 'projects/dashboard/src/app/vvtk-core/interface/product-pdf';
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vvtk-product-pdf-info',
  templateUrl: './product-pdf-info.component.html',
  styleUrls: ['./product-pdf-info.component.scss']
})

export class ProductPdfInfoComponent implements OnInit {

  pageIsEditable: boolean;
  selectedLanguage$: Subscription;
  isLoading = false;
  isAddData: boolean;
  data: ProductPdfInfo = {};
  accessoryHtmlEditorPath = 'Product/PDFInfo/Accessory';
  orderInformationHtmlEditorPath = 'Product/PDFInfo/OrderInformation';
  modelName: string;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 150
  };

  constructor(
    private sharedService: SharedService,
    private vvtkApiService: VvtkApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.data = {
      pdfTemplates: []
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.route.params.subscribe(params => {
      this.data.productId = +params['id'];
    });

    this.modelName = this.route.snapshot.queryParamMap.get('name');

    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getProductPdfInfo(this.data.productId);
      }
    );
  }

  getProductPdfInfo(productId: number) {
    this.isLoading = true;
    this.vvtkApiService.get<ProductPdfInfo>({
      path: `api/Products/${productId}/ProductPDFInfo`,
      disableLanguage: false
    }).subscribe(res => {
      if (res == null) {
        this.isAddData = true;
      } else {
        this.data = res;
        this.parseAccessoryTemplate(res.accessoryTemplate);
      }
      this.isLoading = false;
    });
  }

  parseAccessoryTemplate(accessoryTemplate: string) {
    this.data.pdfTemplates = JSON.parse(accessoryTemplate);
  }

  changeShowOverview($event) {
    this.data.showOverview = $event.checked;
  }

  addTemplate() {
    this.data.pdfTemplates = this.data.pdfTemplates || [];
    this.data.pdfTemplates.push({
      type: '',
      title: '',
      htmlContent: '',
      AccessoryItems: []
    });
  }

  getModelDetail(accessoryItem: AccessoryItem, model: string) {
    this.isLoading = true;
    this.vvtkApiService.post<any>({
      path: `api/Products/Details`,
      disableLanguage: false
    }, { name: model },
      new HttpHeaders(),
      ''
      ).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        res => {
          accessoryItem.description = res && res.shortDescription;
          accessoryItem.imgSrc = res && res.images[0] && res.images[0].imagePath;
        }
      );
  }

  uploadFile(accessoryItem: AccessoryItem, $event) {
    const file: File = $event.target.files[0];
    this.vvtkApiService.uploadFile(file, `Product/PDFInfo/${file.name}`).pipe(
      finalize(() => $event.target.value = null)
    ).subscribe(
      x => accessoryItem.imgSrc = x.link
    );
  }

  emptyTemplate(pdfTemplate: PdfTemplate, $event) {
    pdfTemplate.type = $event;
    pdfTemplate.title = '';
    pdfTemplate.htmlContent = '';
    pdfTemplate.AccessoryItems = [];
  }

  addAccessoryItem(pdfTemplate: PdfTemplate) {
    pdfTemplate.AccessoryItems.push({
      model: '',
      imgSrc: '',
      description: '',
      title: ''
    });
  }

  deleteAccessoryItem(pdfTemplate: PdfTemplate, accessoryItem: AccessoryItem) {
    pdfTemplate.AccessoryItems = pdfTemplate.AccessoryItems.filter(x => x !== accessoryItem);
  }

  deletePdfTemplate(pdfTemplate: PdfTemplate) {
    this.data.pdfTemplates = this.data.pdfTemplates.filter(x => x !== pdfTemplate);
  }

  save() {
    this.isLoading = true;
    this.vvtkApiService.patch({
      path: `api/Products/${this.data.productId}/ProductPDFInfo`,
      disableLanguage: false
    }, this.data).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.router.navigate(['/products/product'])
    );
  }
}
