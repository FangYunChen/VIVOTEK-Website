import { Component, OnInit } from '@angular/core';
import { DesignToolProductInfo } from '../../interface/design-tool-product-info';
import { DesignToolTypeInfo } from '../../interface/design-tool-type-info';
import { DesignToolService } from '../../design-tool.service';
import { DesignToolProductService } from '../../design-tool-product.service';
import { convertToYoutubeEmbedUrl } from '@frontdesk/core/utils/youtube-url-convert-utils';

@Component({
  selector: 'vvtk-calculation-setting-header',
  templateUrl: './calculation-setting-header.component.html',
  styleUrls: ['./calculation-setting-header.component.scss']
})
export class CalculationSettingHeaderComponent implements OnInit {
  product: DesignToolProductInfo;
  typeList: Array<DesignToolTypeInfo>;
  ScenarioArr = [
    {
      value: 'Traffic_Monitoring',
      name: 'Traffic Monitoring',
      link: 'https://www.youtube.com/watch?v=uv52M4KoiNU&feature=youtu.be',
    }
    ,{
      value: 'Metro_Station',
      name: 'Metro Station',
      link: 'https://youtu.be/E4YLzOzMiY0',
    },
    {
      value: 'Office',
      name: 'Office',
      link: 'https://youtu.be/pLobqmZngDQ',
    },
    {
      value: 'Park',
      name: 'Park',
      link: 'https://youtu.be/Rfg9uYjmoTg',
    },
    {
      value: 'Traffic_Monitoring_LowLight',
      name: 'Traffic Monitoring (Low Light)',
      link: 'https://youtu.be/XJtPwmX1CUc',
    }
  ];
  modelList: Array<string>;
  openPopup = false;
  videoUrl = '';

  constructor(
    private designToolService: DesignToolService,
    private designToolProductService: DesignToolProductService
  ) {}

  ngOnInit() {
    this.designToolService.getTypeList().subscribe(data => {
      this.typeList = data;
    });
    this.designToolProductService.product$.subscribe(index => {
      this.product = this.designToolProductService.productList[index];
      this.changeModelList(this.product.typeName);
    });
  }

  typeChanged() {
    this.changeModelList(this.product.typeName);
    this.changeModel('');
  }

  changeModelList(typeName: string) {
    if (typeName) {
      this.modelList = this.typeList
      .filter(type => type.TypeName === typeName)
      .pop().ModelNameList;
    } else {
      this.modelList = Array<string>();
    }
  }

  changeModel(modelName: string) {
    this.product.modelName = modelName;
    this.designToolProductService.productModelChanged(modelName);
    this.product.lensqty = this.Modellens(modelName);
    this.changeQty();
  }

  changeQty() {
    this.product.qty = this.product.q * this.product.lensqty;
  }

  Modellens(modelName: string) {
    if (modelName === 'MA8391-ETV' || modelName === 'MA9321-EHTV' || modelName === 'MA9322-EHTV') {
      return 4;
    } else {
      return 1;
    }
  }

  openVideo() {
    const videoUrl = this.ScenarioArr.filter(
      Scenario => Scenario.value === this.product.scenario
    ).pop();
    if (!videoUrl) {
      return;
    }
    this.videoUrl = convertToYoutubeEmbedUrl(videoUrl.link);
    this.openPopup = true;
  }

  windowPopup(isPopup: boolean) {
    this.openPopup = isPopup;
  }

  changeScenario() {
    this.designToolService.getBandWidthList(this.product.scenario)
    .subscribe(data => {
      this.designToolProductService.bandWidthList$.next(data);
    });
  }
}
