import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductSpecificaionPurposeType } from '@frontdesk/core/constants/product-constant';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { AnchorBarItem } from '@frontdesk/shared/components/anchor-bar/anchor-bar.component';
import { ModelSpecificationsData } from '@frontdesk/shared/components/model-specifications/model-specifications.component';
import { forkJoin, Subject, EMPTY } from 'rxjs';
import { takeUntil, tap, concatMap } from 'rxjs/operators';
import { ProductMainInfo } from '../../interfaces/product-main-info';
import { ProductTabInfo } from '../../interfaces/product-tab-info';
import { DownloadCenterApiService } from '@frontdesk/core/services/api-data/download-center-api.service';
import { ModelTableDownloadData } from '@frontdesk/shared/components/model-table-download/model-table-download.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'vvtk-normal-product',
  templateUrl: './normal-product.component.html',
  styleUrls: ['./normal-product.component.scss']
})
export class NormalProductComponent implements OnInit, OnDestroy {

  @Input() productMainInfo: ProductMainInfo;
  @Input()
  set productTabInfos(value: ProductTabInfo[]) {
    this._productTabInfos = value;
    this.anchorBarItems = this.convertProductTabInfosToAnchorBarItems(value);
    this.loadOtherDataByTabInfos(value)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => { },
        error => { console.log('Error: ', error); },
        () => { 
          const element = document.querySelector('#' + this.flag);
          if (element) { element.scrollIntoView(true);}
        }
      );
      
      
  }
  get productTabInfos() {
    return this._productTabInfos;
  }
  @Input() displayMainInfo = true;

  anchorBarItems: AnchorBarItem[];
  keyFeaturesTemplate = {
    title: 'Key Features',
    rowColumn: 1,
    listItems: [{ itemTexts: [] }]
  };
  specifications: ModelSpecificationsData = {
    title: 'Specifications',
    nestedSpecs: []
  };
  downloadData: ModelTableDownloadData = {
    title: 'Downloads',
    dataSource: [],
    dynamicColumns: []
  };
  relatedProductTemplate = {
    title: 'Related Products',
    rowColumn: 5,
    linkImages: []
  };

  private destroy$ = new Subject();
  private _productTabInfos: ProductTabInfo[];
  flag:string;

  constructor(
    private router: Router,
    private vvtkApiService: VvtkApiService,
    private downloadCenterApiService: DownloadCenterApiService
  ) { }

  ngOnInit() {
    //alert(this.router.url.split('#')[1]);
    this.flag = this.router.url.split('#')[1];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  downloadLangChange(lang: string = 'global') {
    this.loadDownloadData(lang).subscribe();
  }

  private convertProductTabInfosToAnchorBarItems(productTabInfos: ProductTabInfo[]) {
    return (productTabInfos || [])
      .filter(item => item.isDisplayOnTop)
      .map(item => {
        return {
          name: item.tabName,
          anchor: item.anchorUrl
        };
      });
  }

  private loadOtherDataByTabInfos(productTabInfos: ProductTabInfo[]) {
    if (!productTabInfos) {
      return EMPTY;
    } 
    return forkJoin(
      productTabInfos.map(productTabInfo => {
        switch (productTabInfo.tabType) {
          case 1:
            return this.loadKeyFeaturesOfProduct(this.productMainInfo.id);
          case 4:
            return this.loadSpecificationsOfProduct(this.productMainInfo.id);
          case 8:
            return this.loadDownloadsOfProduct();
          case 10:
            return this.loadRelatedProducts(this.productMainInfo.id, productTabInfo.tabName);
        }
      }).filter(x => x)
    );
  }

  private loadKeyFeaturesOfProduct(id: number) {
    return this.vvtkApiService.get<any>({
      path: `api/Products/${id}/Features`
    }).pipe(
      tap(
        data => {
          this.keyFeaturesTemplate.listItems[0].itemTexts = data.map(item => {
            return {
              text: item.content
            };
          });
        }
      )
    );
  }

  private loadSpecificationsOfProduct(id: number) {
    return this.vvtkApiService.get<any>({
      path: `api/Products/${id}/Specification`,
      query: `purposeType=${ProductSpecificaionPurposeType.PageSpec}`
    }).pipe(
      tap(
        data => {
          this.specifications.nestedSpecs = data;
        }
      )
    );
  }

  private loadDownloadsOfProduct() {
    return forkJoin([this.loadDownloadColumn(), this.loadDownloadData()]);
  }

  private loadDownloadColumn() {
    return this.downloadCenterApiService.getDocumentTypes()
      .pipe(
        concatMap(types => this.downloadCenterApiService.getDocumentPropertyMapping(types.find(x => x.name === 'Product').id)),
        tap(mappings => {
          this.downloadData.dynamicColumns = mappings; //

          if ( this.downloadData.dynamicColumns[0].name === 'Download') {
            this.downloadData.dynamicColumns[0].name = ' ';
            this.downloadData.dynamicColumns.splice(1 , 0
              , {id: 0, name: 'Document Type', type: 1});
          } else {
            this.downloadData.dynamicColumns.splice(0 , 0
              , {id: 0, name: 'Document Type', type: 1});
          }
          // [{ id: 0, name: 'Document Type', type: 1}, ...mappings];
        })
      );
  }

  private loadDownloadData(lang: string = 'global') {
    const query = {
      pageIndex: 0,
      pageSize: 9999999,
      productId: this.productMainInfo.id
    };
    return this.downloadCenterApiService.getDownloadData(query, lang)
      .pipe(
        tap(data => this.downloadData.dataSource = data.list)
      );
  }

  private loadRelatedProducts(id: number, tabName: string) {
    return this.vvtkApiService.get<any>({
      path: `api/Products/${id}/RelatedProducts`
    }).pipe(
      tap(
        data => {
          this.relatedProductTemplate.title = tabName;
          this.relatedProductTemplate.linkImages = data.map(item => {
            return {
              src: item.imagePath,
              title: item.name,
              alt: item.name,
              linkText: item.name,
              description: item.shortDescription,
              url: `/${item.name}`
            };
          });
        }
      )
    );
  }

}
