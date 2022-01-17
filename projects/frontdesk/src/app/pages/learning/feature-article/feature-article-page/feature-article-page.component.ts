import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/internal/operators';

@Component({
  selector: 'vvtk-feature-article-page',
  templateUrl: './feature-article-page.component.html',
  styleUrls: ['./feature-article-page.component.scss']
})
export class FeatureArticlePageComponent implements OnInit {
  _Content = { templates: [{ type: 0 }], linkText: '' };
  data = {
    id: ''
  };
  constructor(private vvtkService: VvtkService, private router: Router) {
    this.getArticlePageId();
  }

  ngOnInit() {
    this.getArticlePageData();
  }

  getArticlePageData() {
    this.vvtkService.get(
      {
        path: `api/Supports/Learning/FeatureArticleList/${this.data.id}`,
        disableLanguage: false
      },
      {
        next: resp => {
          if (!resp.json()) {
            this.router.navigateByUrl('/404');
          } else {
            this._Content = resp.json() ? resp.json() : this._Content;
          }
        }
      }
    );
  }

  getArticlePageId() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const splitArray = event['url'].split('/');
        let lastQueryParam: any = splitArray[splitArray.length - 1];
        if (isNaN(lastQueryParam)) {
          lastQueryParam = splitArray[splitArray.length - 2];
        }
        this.data.id = lastQueryParam;
        if(this.data.id === '24')
        {
          this.router.navigateByUrl('/learning/feature-article/smart-vca');
        }else if(this.data.id === '16')
        {
          this.router.navigateByUrl('/learning/feature-article/smart-motion-detection');
        }else if(this.data.id === '39')
        {
          this.router.navigateByUrl('/learning/feature-article/parking-violation-detection');
        }else if(this.data.id === '41')
        {
          this.router.navigateByUrl('/learning/feature-article/restricted-zone-detection');
        }
      });
  }
}
