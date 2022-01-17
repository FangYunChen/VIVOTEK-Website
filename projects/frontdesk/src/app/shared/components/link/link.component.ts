import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { QueryParamsHandling } from '@angular/router/src/config';

@Component({
  selector: 'vvtk-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit, OnChanges {

  @Input() href: string;
  @Input() routerLink: any[] | string;
  @Input() target: string;
  @Input() queryParams: {
    [k: string]: any;
  };
  @Input() fragment: string;
  @Input() queryParamsHandling: QueryParamsHandling;
  @Input() preserveFragment: boolean;
  @Input() skipLocationChange: boolean;
  @Input() replaceUrl: boolean;
  @Input() cName: string;
  @Input() useHref: boolean;

  routerLinkFromHref: any[] | string;
  queryParamsFromHref: {
    [k: string]: any;
  };
  fragmentFromHref: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.href && typeof changes.href.currentValue === 'string') {
      this.updateFromHref(changes.href.currentValue);
    }
  }

  private updateFromHref(href: string) {
    this.useHref = this.useHref || href.startsWith('http');
    if (this.useHref) {
      return;
    }
    const queryParamsSplitIndex = href.indexOf('?');
    const fragmentSplitIndex = href.indexOf('#');
    const paths = href.split(/[\?\#]/i);
    this.href = decodeURIComponent(paths[0]);
    if (queryParamsSplitIndex === fragmentSplitIndex) {
      // not includes '?' and '#'
    } else if (queryParamsSplitIndex < fragmentSplitIndex) {
      // '?' before '#'
      switch (paths.length) {
        case 3:
          // includes '?'
          this.queryParams = this.queryStringToParams(paths[1]);
          this.fragment = paths[2];
          break;
        case 2:
          // not includes '?'
          this.fragment = paths[1];
          break;
      }
    } else if (queryParamsSplitIndex > fragmentSplitIndex) {
      // '?' after '#'
      switch (paths.length) {
        case 3:
          // includes '#'
          this.fragment = paths[1];
          this.queryParams = this.queryStringToParams(paths[2]);
          break;
        case 2:
          // not includes '#'
          this.queryParams = this.queryStringToParams(paths[1]);
          break;
      }
    }
  }

  private queryStringToParams(queryString: string) {
    const params = {};
    queryString.split('&').forEach(item => {
      const arr = item.split('=');
      params[arr[0]] = arr[1];
    });
    return params;
  }

}
