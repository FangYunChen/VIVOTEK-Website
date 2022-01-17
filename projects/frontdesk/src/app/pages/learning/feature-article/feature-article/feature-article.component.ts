import { Component, OnInit } from '@angular/core';
import { VvtkService, I18nService } from '@frontdesk/core/services';
import {
  Banners
} from '../../../../vvtk-core/interfaces/feature-article-models';

@Component({
  selector: 'vvtk-feature-article',
  templateUrl: './feature-article.component.html',
  styleUrls: ['./feature-article.component.scss']
})
export class FeatureArticleComponent implements OnInit {
  items = [];
  apiPathPrefix = 'api/Supports/Learning/FeatureArticleList';
  banner: Banners = {
    PC: {
      type: 'PC',
      imageName: '',
      imageAlt: '',
      imageUrl: '',
      hideContent: false
    },
    Tablet: {
      type: 'Tablet',
      imageName: '',
      imageAlt: '',
      imageUrl: '',
      hideContent: false
    },
    Mobile: {
      type: 'Mobile',
      imageName: '',
      imageAlt: '',
      imageUrl: '',
      hideContent: false
    }
  };

  constructor(private vvtkService: VvtkService, public i18nService: I18nService) {}

  ngOnInit() {
    this.getBanner();
    this.getArticleList();
  }

  getBanner() {
    this.vvtkService.get(
      {
        path: `${this.apiPathPrefix}/Banner`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          body.forEach(item => {
            item.hideContent = false;
            if (item.type === 'PC') {
              this.banner.PC = item;
            } else if (item.type === 'Tablet') {
              this.banner.Tablet = item;
            } else if (item.type === 'Mobile') {
              this.banner.Mobile = item;
            }
          });
        },
        finally: () => {}
      }
    );
  }

  getArticleList() {
    this.vvtkService.get(
      {
        path: `${this.apiPathPrefix}`,
        disableLanguage: false
      },
      {
        next: resp => {
          const body = resp.json();
          this.items = body;
        }
      }
    );
  }

  get browserWidth() {
    return document.body.clientWidth;
  }

  get bannerImageSrc() {
    const width = this.browserWidth;
    if (width > 1024) {
      return this.banner.PC.imageUrl;
    } else if (width <= 1024 && width > 640) {
      return this.banner.Tablet.imageUrl;
    } else {
      return this.banner.Mobile.imageUrl;
    }
  }

  private discriptionClip(text: string) {
    if (text.length > 240) {
      text = text.substr(0, 236) + '...';
    }
    return text;
  }

  private convertItemid(text){
    var id = text;
    if(id === 24){
      id = '';
    }
    else if(id === 16){
      id = '';
    }
    else if(id === 39){
      id = '';
    }
    else if(id === 41){
      id = '';
    }
    else if(id === 42){
      id = '';
    }
    return id;
  }
}
