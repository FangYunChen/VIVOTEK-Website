import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
/**
 * @deprecated 盡量改用LinkComponent
 * @export
 * @class AComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'vvtk-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.scss']
})
export class AComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  @Input() cName = '';
  @Input() url = '';
  @Input() vvtkRouterLink = [];
  @Input() target: string;
  constructor(@Inject(PLATFORM_ID) private platform_id) {}

  ngOnInit() {}

  get blankUrl() {
    if (this.isBrowser) {
      if (!this.url || this.url.length === 0 || this.url === 'null') {
        return this.vvtkRouterLink.join('/');
      } else {
        return this.url;
      }
    }
  }
}
